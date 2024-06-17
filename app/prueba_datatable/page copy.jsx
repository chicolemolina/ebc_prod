'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { NoDataComponent } from '../components/DataTable_NoDataComponent';



export default function TablaFacturas() {

	const HeadingSTyle = "mb-4 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"

	const columns = [
		{
			name: 'socio_CodPK',
			selector: row => row.socio_CodPK,
			sortable: true,
		},
		{
			name: 'socio_Nombre',
			selector: row => row.socio_Nombre,
			sortable: true,
		},
		{
			name: 'socio_Email',
			selector: row => row.socio_Email,
			sortable: true,
		},
	];


	const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
	const [drawCounter, setDrawCounter] = useState(0);
	const [totalRecords, setTotalRecords] = useState(0);
	const [perPage, setPerPage] = useState(10); // Valor inicial

    useEffect(() => {
        fetchData();
    }, [currentPage, perPage]);

    const fetchData = () => {
        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                page: currentPage, // Envía el número de página al servidor
				draw: drawCounter,
				perPage: perPage
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

	return (

		<div className="mx-[40px] mt-[100px] md:ml-[300px]">

			<h1 className={HeadingSTyle}>Facturas</h1>

			<DataTable
				columns={columns}
                data={data}
                pagination
                paginationServer
                paginationPerPage={perPage}
                paginationTotalRows={totalRecords} // Aquí debes enviar el total de registros desde el servidor
                onChangePage={setCurrentPage}
				onChangeRowsPerPage={setPerPage}
                noDataComponent={<NoDataComponent />} 
				paginationComponentOptions={{ 
					rowsPerPageText: 'Elementos por página:', // Texto que se muestra junto al selector de filas por página
					rangeSeparatorText: 'de', // Texto que separa los números de página actual y total
					noRowsPerPage: false, // Si se establece en true, oculta el selector de filas por página
					selectAllRowsItem: false, // Si se establece en true, muestra una opción para seleccionar todas las filas
					selectAllRowsItemText: 'All' // Texto de la opción para seleccionar todas las filas
				}}
			/>

		</div>

	);
}

