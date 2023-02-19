import { useEffect, useState, useCallback, createContext, useMemo } from 'react';
import api from '../../common/api';
import ToolBar from '../ToolBar/ToolBar';
import Table from '../../partials/Table';
import { Pagination, CircularProgress } from '@mui/material';
import MyBreadCrumbs from '../../partials/MyBreadCrumbs';
import './DataComponent.scss'
async function fetchData(type, pageSize, currentPage, filterCategory, filterValue) {
    try {
        let filterQuery = '?';
        if (filterCategory !== '' && filterValue !== '') {
            if (type === 'products') {
                if (filterCategory === 'category') filterQuery = `/category/${filterValue}?`
                else filterQuery = `/search?q=${filterValue}&`
            } else {
                filterQuery = `/filter?key=${filterCategory}&value=${filterValue}&`
            }
        }
        const skip = (currentPage - 1) * pageSize;
        const response = await api.get(`/${type}${filterQuery}limit=${pageSize}&skip=${skip}`, { withCredentials: false });
        return response.data;

    } catch (e) {
        console.log(e.message);
    }
}


export const DataContext = createContext(null);

function DataComponent({ type, entries }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalSize, setTotalSize] = useState(0);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ filterCategory: '', filterValue: '' });
    const [productsCategories, setProductsCategories] = useState([]);

    const handleFilterChange = (value) => {
        setFilter(value);
        setCurrentPage(1);
    }

    const handleDataChange = (data) => {
        setFilteredData(data);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const productCategoriesMemo = useMemo(
        async function fetchCategories() {
            if (type !== 'products') return;
            try {
                const response = await api.get(`/products/categories`, { withCredentials: false });
                return await response.data;
            } catch (e) {
                console.log(e.message);
            }
        }
        , [type])

    const getData = useCallback(async () => {
        const data = await fetchData(type, pageSize, currentPage, filter.filterCategory, filter.filterValue);
        console.log(data);
        setTotalSize(data?.total);
        setData(data[type]);
        setFilteredData(data[type]);
    }, [type, pageSize, currentPage, filter])

    useEffect(() => {
        let active = true
        if (active) {
            setLoading(true);
            getData();
            productCategoriesMemo.then((data) => setProductsCategories(data))
            setLoading(false);
        }
        return () => { active = false }
    }, [type, pageSize, currentPage, filter, getData, productCategoriesMemo])

    return (
        <>
            <MyBreadCrumbs name={type === 'users' ? 'Users' : 'Products'} link={`/${type}`} />
            <DataContext.Provider value={{ loading, type, data, filteredData, filter, entries, pageSize, productsCategories }}>
                <ToolBar
                    sizeOptions={[5, 10, 20, 50]}
                    handlePageSizeChange={handlePageSizeChange}
                    handleDataChange={handleDataChange}
                    handleFilterChange={handleFilterChange}
                />
                <br />
                <div className='body'>
                    {loading || !data ? <CircularProgress /> : <Table />}
                </div>
            </DataContext.Provider >
            <br />
            <Pagination
                id='pagination'
                className="pagination-bar"
                page={currentPage}
                count={Math.ceil(totalSize / pageSize)}
                onChange={(e, page) => setCurrentPage(page)}
            />
        </>
    );
}

export default DataComponent;
