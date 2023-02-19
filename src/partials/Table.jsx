import React from 'react';
import { useContext } from 'react';
import { DataContext } from '../components/DataComponent/DataComponent';
import { headers } from '../config/entriesToHeaders';
import { CircularProgress } from '@mui/material';
import './Table.scss'
function Table() {
    const { filteredData, loading, entries, filter } = useContext(DataContext);
    if (loading) return <CircularProgress />;
    return (
        <table>
            <thead>
                <tr>
                    {entries.map((e, index) => index < 12 && <th key={index}> {headers[e]} </th>)}
                    {filter.filterCategory && entries.indexOf(filter.filterCategory) > 11 && <th key='filter-coloumn'>  {headers[filter.filterCategory]} </th>}
                </tr>
            </thead>
            <tbody>
                {filteredData.map(item => (
                    <tr key={item.id}>
                        {entries.map((e, index) => index < 12 &&
                            <td key={index}>
                                {e === 'image' || e === 'thumbnail' ? <a href={item[e]} target="_blank" rel="noreferrer"> <img alt='' src={item[e]} width='50px' loading='lazy' />  </a> : item[e]}
                            </td>
                        )}
                        {filter.filterCategory && entries.indexOf(filter.filterCategory) > 11 &&
                            <td key='filter-cell'>
                                {item[filter.filterCategory]}
                            </td>
                        }
                    </tr>
                )
                )}
            </tbody>
        </table>
    );
}

export default Table;