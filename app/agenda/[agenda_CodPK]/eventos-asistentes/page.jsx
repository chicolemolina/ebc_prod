
'use client'

import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';
import { FlexBox } from '@/components';
import { CajaSocio } from '@/app/socios/components'
import { NoDataComponent, BuscadorTabla, PaginationComponentOptions } from '@/components/Datatable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDataTable } from './hooks';


export default function HomeAsistentesEvento({params}) {

	const HeadingSTyle = "mb-6 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"

    const { agenda_CodPK } = params;

	const [socios, setSocios] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const [filtro, setFiltro] = useState([
		{ 
			field: "invitado_AgendaFK", 
			comparison: "=", 
			value: agenda_CodPK
		},
		{
			field: "invitado_Estado", 
			comparison: "=", 
			value: "Alta"
		}
	]);
	
	useEffect(() => {
	
		if (!loaded) 
		{
			const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage (o donde lo almacenes)
		   
			const requestOptions = {
				method: 'post', // Especificar el método POST
				headers: {
					'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
					'Access-Control-Allow-Origin': '*',
					'Authorization': `Bearer ${token}` 
				},
				data: {
					action: "get-asistentes",
					agenda_CodPK: agenda_CodPK,
				} // Datos a enviar en el cuerpo de la solicitud
			};
	
			axios("/api", requestOptions)
			.then((response) => {
				// console.log(response);
				
				if (response.data.success) 
				{
					setLoaded(true);
					setSocios(response.data.socioData);
				} 
				else 
					toast.error(response.data.errorMessage);
			})
			.catch((error) => {
				console.error(error);
			});
	
		}
	
	}, [loaded]);


	const {
        columns,
        data,
        setCurrentPage,
        perPage,
        setPerPage,
        totalRecords,
        handleSort,
        searchText,
        handleSearchChange,
    } = useDataTable(filtro);

	return (

		<div className="mx-[40px] mt-[100px] md:ml-[300px]">

			<h1 className={HeadingSTyle}>Listado de asistentes</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-center">
				
					{
						socios.map((socio, index) => (
							<CajaSocio 
								key={index} 
								// {...socio} 
								socio={socio}
							/>
						))
           	 		}

				</div>

				<div className="w-full mt-8">
					<h1 className={HeadingSTyle}>Listado de invitados</h1>

					<FlexBox>
				
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
						paginationComponentOptions={PaginationComponentOptions()}
						subHeader
						subHeaderComponent={
							<BuscadorTabla searchText={searchText} handleSearchChange={handleSearchChange} />
						}
					/>

					</FlexBox>
				</div>
			

		</div>

	);
}