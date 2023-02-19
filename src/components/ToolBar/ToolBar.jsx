import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../DataComponent/DataComponent';
import { Select, MenuItem, TextField, Button, Divider, InputLabel } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import './ToolBar.scss'
import { headers, categories } from '../../config/entriesToHeaders';

function ToolBar({ sizeOptions, handlePageSizeChange, handleDataChange, handleFilterChange }) {
    const { data, type, pageSize, filter, entries, productsCategories } = useContext(DataContext);
    const [showTextInput, setShowTextInput] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        let searchData = data.filter(e => {
            for (let key in e) {
                const type = typeof e[key];
                if (type === 'number') {
                    if (e[key] === searchValue) {
                        return true;
                    }
                } else if (type === 'string') {
                    if (e[key].toLowerCase().includes(searchValue.toLowerCase())) {
                        return true;
                    }
                }
            }
            return false;
        })
        handleDataChange(searchData);
    }, [searchValue, data, handleDataChange])

    return (
        <div className='tool-bar'>
            {/* page Size */}
            <InputLabel style={{ fontFamily: 'Neutra Text, Sans serif', fontWeight: 'bold', color: '#322625' }}> Page Size: </InputLabel>
            <Select
                labelId="page-size-select"
                id="page-size-select"
                value={pageSize}
                label="Page Size"
                onChange={(e) => handlePageSizeChange(e.target.value)}
            >
                {sizeOptions.map((size, index) => <MenuItem key={index} value={size}>{size}</MenuItem>)}
            </Select>
            <Divider orientation='vertical' sx={{ height: '30px' }} />

            {/* Search */}
            <InputLabel style={{ fontFamily: 'Neutra Text, Sans serif', fontWeight: 'bold', color: '#322625' }}> Search: </InputLabel>
            <div className='search' title='Field to search currently rendered rows'>
                <Button onClick={() => (setShowTextInput(!showTextInput))}>
                    <SearchOutlined />
                </Button>
                <span hidden={!showTextInput} onBlur={() => { setShowTextInput(false); setSearchValue('') }}>
                    <TextField
                        id="search-text-field"
                        label="Search"
                        variant="standard"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                </span>
            </div>
            <Divider orientation='vertical' sx={{ height: '30px' }} />

            {/* Filters */}
            {type === 'products' ?
                <>
                    {/* Category Select for Products */}
                    <InputLabel id="category-filter-label" style={{ fontFamily: 'Neutra Text, Sans serif', fontWeight: 'bold', color: '#322625' }}> Category: </InputLabel>
                    <Select
                        labelId="category-filter-label"
                        id="category-filter"
                        value={filter.filterValue}
                        label="Category:"
                        sx={{ minWidth: '200px' }}
                        onChange={(e) => handleFilterChange({ ...filter, filterCategory: 'category', filterValue: e.target.value })}
                    >
                        {productsCategories.map((entry, index) => <MenuItem key={index} value={entry}>{categories[entry]}</MenuItem>)}
                    </Select>
                </>
                :
                <>
                    <InputLabel id="entries-filter-label" style={{ fontFamily: 'Neutra Text, Sans serif', fontWeight: 'bold', color: '#322625' }}> Filter by: </InputLabel>
                    <Select
                        labelId="entries-filter-label"
                        id="entries-filter"
                        value={filter.filterCategory}
                        label="Filter by:"
                        sx={{ minWidth: '200px' }}
                        onChange={(e) => handleFilterChange({ ...filter, filterCategory: e.target.value })}
                    >
                        {entries.map((entry, index) => <MenuItem key={index} value={entry}>{headers[entry]}</MenuItem>)}
                    </Select>
                </>
            }

            {
                filter.filterCategory &&
                <>
                    {type !== 'products' &&
                        <TextField
                            id="filter-text-field"
                            label={`Filter by: ${headers[filter.filterCategory]}`}
                            variant="standard"
                            value={filter.filterValue}
                            onChange={(e) => handleFilterChange({ ...filter, filterValue: e.target.value })}
                        />
                    }
                    <Button
                        variant='outlined'
                        color='warning'
                        onClick={() => (handleFilterChange({ filterCategory: '', filterValue: '' }))}>
                        Reset Filter
                    </Button>
                </>
            }
        </div>
    );
}

export default ToolBar;