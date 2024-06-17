'use client';

import DataTable from 'react-data-table-component';
import { NoDataComponent, BuscadorTabla, PaginationComponentOptions } from '../components/Datatable';
import { useDataTable } from './hooks';
import { useState } from 'react';

export default function TablaFacturas() {

    const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));
    const [filtro, setFiltro] = useState([
        { 
            field: "factura_SocioFK", 
            comparison: "=", 
            value: ebc_userData.socio_CodPK 
        }
    ]);

    const HeadingStyle = "mb-4 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl";


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

