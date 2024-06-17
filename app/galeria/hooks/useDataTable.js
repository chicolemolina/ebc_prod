// hooks/useDataTable.js
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { HiEye } from "react-icons/hi2";
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import axios from 'axios';


export const useDataTable = (filtro) => {

    const columns = [
        {
            name: 'IMAGEN',
            cell: row => (
                <>
                    <img src={`https://socios.excellencebusinessclub.com/archivos/agenda/${row.agenda_Imagen}`} className='my-2'></img>
                </>
            ),
            width: '10%',
        },
        {
            name: 'FECHA',
            selector: row => row && row.agenda_Fecha,
            sortable: true,
            format: row => format(new Date(row.agenda_Fecha), 'dd/MM/yyyy'), // Formatea la fecha en formato dd/MM/yyyy
            dbField: 'agenda_Fecha',
            sortFunction: () => { }, // No realiza ninguna ordenación en el cliente
        },
        {
            name: 'TÍTULO',
            selector: row => row && row.agenda_Titulo,
            sortable: true,
            dbField: 'agenda_Titulo',
            sortFunction: () => { }, // No realiza ninguna ordenación en el cliente
        },
        {
            name: 'ACCIONES',
            cell: row => (
                <>
                    {
                        (row.agenda_URL_Galeria != "") ? 
                            <>
                                <Link
                                    href={`${row.agenda_URL_Galeria}`}
                                    className="group text-white bg-zinc-200 hover:bg-zinc-400 font-medium rounded-lg text-sm px-4 py-2.5 mr-1"
                                    data-tooltip-id={`tooltipEye-${row.agenda_CodPK}`} 
                                    data-tooltip-content={"Ver galería"}
                                >
                                    <HiEye className="text-gray-500 group-hover:text-white"/>
                                </Link>
                                <Tooltip id={`tooltipEye-${row.agenda_CodPK}`}  />
                            </>
                        : 
                            "No disponible"
                    }
                </>
            ),
            // cell: row => <button onClick={() => handleButtonClick(row)}>Ver</button>,
            button: "true",
        },
    ];

    const handleButtonClick = (row) => {
        // Aquí puedes definir la lógica que deseas ejecutar cuando se hace clic en el botón
        console.log('Botón clickeado para la fila:', row);
    };

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [drawCounter, setDrawCounter] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [sortField, setSortField] = useState("agenda_Fecha"); // ordenacion por defecto
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, perPage, sortField, sortOrder, searchText, filtro]);

    const fetchData = () => {
        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                tableName: "agenda",
                fields: ["agenda_CodPK", "agenda_Titulo", "agenda_Fecha", "agenda_URL_Galeria", "agenda_Imagen"],
                tableInner: "",
                filtro: filtro,
                page: currentPage,
                draw: drawCounter,
                perPage: perPage,
                sortField: sortField,
                sortOrder: sortOrder,
                searchText: searchText,
            },
        };

        axios("/api_table", requestOptions)
            .then((response) => {
                setData(response.data.data);
                setDrawCounter(prevCounter => prevCounter + 1);
                setTotalRecords(response.data.recordsTotal);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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


