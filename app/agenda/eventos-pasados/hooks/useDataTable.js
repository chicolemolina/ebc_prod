import { useEffect, useState } from 'react';
import { useColumns } from './useColumns';
import { fetchData } from '../utils/api';

export const useDataTable = (filtro) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [drawCounter, setDrawCounter] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [sortField, setSortField] = useState("agenda_Fecha"); // Cambiado a "agenda_Fecha"
    const [sortOrder, setSortOrder] = useState('desc'); // Deberías elegir el orden por defecto, aquí está como 'desc'
    const [searchText, setSearchText] = useState('');

    const columns = useColumns();

    useEffect(() => {
        const loadTableData = async () => {
            try {
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
