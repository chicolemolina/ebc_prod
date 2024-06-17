'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { NoDataComponent, BuscadorTabla } from '@/components/Datatable';

export default function TablaFacturas() {

	const HeadingStyle = "mb-4 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"

	const columns = [
		{
			name: 'socio_CodPK',
			selector: row => row && row.socio_CodPK,
			filter: true, // Habilita el filtro para esta columna
			sortable: true,
			
			sortFunction: () => {}, // No realiza ninguna ordenación en el cliente
		},
		{
			name: 'socio_Nombre',
			selector: row => row && row.socio_Nombre,
			sortable: true,
			filter: true, // Habilita el filtro para esta columna
			sortFunction: () => {}, // No realiza ninguna ordenación en el cliente
		},
		{
			name: 'socio_Email',
			selector: row => row && row.socio_Email,
			sortable: true,
			filter: true, // Habilita el filtro para esta columna
			sortFunction: () => {}, // No realiza ninguna ordenación en el cliente
		},
	];

	const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
	const [drawCounter, setDrawCounter] = useState(0);
	const [totalRecords, setTotalRecords] = useState(0);
	const [perPage, setPerPage] = useState(10); // Valor inicial
	const [sortField, setSortField] = useState(null); // Nuevo estado para el campo de ordenamiento
    const [sortOrder, setSortOrder] = useState('asc'); // Nuevo estado para el orden de ordenamiento
	const [searchText, setSearchText] = useState('');

	// Función para manejar el evento de ordenamiento de la tabla
	const handleSort = (column, sortDirection) => {
		const field = column.name; // Obtiene el campo de ordenamiento
		setSortField(field); // Establece el campo de ordenamiento
		setSortOrder(sortDirection); // Establece el orden de ordenamiento
	};

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

    useEffect(() => {
        fetchData();
    }, [currentPage, perPage, sortField, sortOrder, searchText]);

    const fetchData = () => {
	

        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
				tableName: "socio",
				fields: ["socio_CodPK", "socio_Nombre", "socio_Email"],
				tableInner: "",
                page: currentPage, // Envía el número de página al servidor
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


	return (

	

		<div className="mx-[40px] mt-[100px] md:ml-[300px]">

			<h1 className={HeadingStyle}>Facturas</h1>

			<DataTable
				columns={columns}
                data={data}
                pagination
                paginationServer
                paginationPerPage={perPage}
                paginationTotalRows={totalRecords} // Aquí debes enviar el total de registros desde el servidor
                onChangePage={setCurrentPage}
				onChangeRowsPerPage={setPerPage}
				onSort={handleSort} // Maneja el evento de ordenamiento de la tabla es lo mismo que esto: onSort={(column, sortDirection) => handleSort(column, sortDirection)}
                noDataComponent={<NoDataComponent />} 
				paginationComponentOptions={{ 
					rowsPerPageText: 'Elementos por página:', // Texto que se muestra junto al selector de filas por página
					rangeSeparatorText: 'de', // Texto que separa los números de página actual y total
					noRowsPerPage: false, // Si se establece en true, oculta el selector de filas por página
					selectAllRowsItem: false, // Si se establece en true, muestra una opción para seleccionar todas las filas
					selectAllRowsItemText: 'All' // Texto de la opción para seleccionar todas las filas
				}}
				// Define la función de filtro global
				onFilter={(filteredData) => setData(filteredData)}
				subHeader
				subHeaderComponent={
					<BuscadorTabla searchText={searchText} handleSearchChange={handleSearchChange}/>
				}


				// Ejemplo de estado para los filtros
				// const [filtroEdad, setFiltroEdad] = useState('');
				// const [filtroApellido, setFiltroApellido] = useState('');

				// <DataTable
				// 	// Otros props...
				// 	onFilter={(filteredData) => {
				// 		// Aplicar el filtro por edad
				// 		let datosFiltrados = filteredData;
				// 		if (filtroEdad) {
				// 			datosFiltrados = datosFiltrados.filter(employee => employee.age === filtroEdad);
				// 		}
				// 		// Aplicar el filtro por apellido
				// 		if (filtroApellido) {
				// 			datosFiltrados = datosFiltrados.filter(employee => employee.lastName.toLowerCase().includes(filtroApellido.toLowerCase()));
				// 		}
				// 		// Actualizar los datos mostrados en la tabla con los datos filtrados
				// 		setData(datosFiltrados);
				// 	}}
				// />

				// // Componente de entrada para la edad
				// <input type="text" value={filtroEdad} onChange={(e) => setFiltroEdad(e.target.value)} />

				// // Componente de entrada para el apellido
				// <input type="text" value={filtroApellido} onChange={(e) => setFiltroApellido(e.target.value)} />
			/>

		</div>

	);
}

