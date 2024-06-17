
import { useEffect, useState } from 'react';
import { useColumns } from './useColumns';
import { handleButtonClick } from '../utils/helpers';
import { fetchData } from '../utils/api';

export const useDataTable = (filtro) => 
{
    const columns = useColumns();

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [drawCounter, setDrawCounter] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [sortField, setSortField] = useState("factura_CodPK");
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        
        const loadTableData = async () => {
            try 
            {
                const { data, totalRecords } = await fetchData({
                    filtro, currentPage, drawCounter, perPage, sortField, sortOrder, searchText
                });

                setData(data);
                setTotalRecords(totalRecords);
                setDrawCounter(prevCounter => prevCounter + 1);

            } catch (error) {
                console.error(error);
            }
        };

        loadTableData();
    }, [currentPage, perPage, sortField, sortOrder, searchText, filtro]);

    const handleSort = (column, sortDirection) => {
        setSortField(column.dbField);
        setSortOrder(sortDirection);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return {
        columns,
        data,
        setCurrentPage,
        perPage,
        setPerPage,
        totalRecords,
        handleSort,
        searchText,
        handleSearchChange,
    };
};
