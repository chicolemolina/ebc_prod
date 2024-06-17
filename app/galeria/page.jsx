'use client';

import DataTable from 'react-data-table-component';
import { NoDataComponent, BuscadorTabla, PaginationComponentOptions } from '@/app/components/Datatable';
import { useDataTable } from './hooks';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function TablaGaleria() {

    const [filtro, setFiltro] = useState([]);

    const HeadingStyle = "mb-4 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl";

    // Obtener y establecer ebc_userData al montar
    useEffect(() => {
        const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));
       
        if (ebc_userData) 
        {
            // Obtener la fecha actual
            const fechaActual = new Date();
            // Formatear la fecha en el formato YYYY-MM-DD
            const fechaFormateada = format(fechaActual, 'yyyy-MM-dd');

            setFiltro([
                { field: "agenda_Estado", comparison: "=", value: "Alta" },
                { field: "agenda_Visible", comparison: "=", value: "Si" },
                { field: "agenda_Fecha", comparison: "<", value: fechaFormateada } // ejemplo de filtro con fecha
            ]);
        }

    }, []);

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

            <h1 className={HeadingStyle}>Galería</h1> 

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
                // Define la función de filtro global
                onFilter={(filteredData) => setData(filteredData)}
                subHeader
                subHeaderComponent={
                    <BuscadorTabla searchText={searchText} handleSearchChange={handleSearchChange} />
                }
            />

        </div>

    );
}

