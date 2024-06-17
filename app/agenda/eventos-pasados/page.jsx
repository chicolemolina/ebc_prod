'use client';

import Link from 'next/link';
import ButtonTab from '../components/ButtonsTab';
import { HiMiniCalendarDays, HiMiniCalendar } from "react-icons/hi2";
import { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import { BuscadorTabla, NoDataComponent, PaginationComponentOptions } from '../../components/Datatable';
import { format } from 'date-fns';
import { useDataTable } from '../eventos-pasados/hooks';

export default function HomeEventosPasados() {
    const HeadingSTyle = "mb-6 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"

    // Obtener la fecha actual
    const fechaActual = new Date();
    // Formatear la fecha en el formato YYYY-MM-DD
    const fechaFormateada = format(fechaActual, 'yyyy-MM-dd');
    const [filtro, setFiltro] = useState([
        { field: "agenda_Estado", comparison: "=", value: "Alta" },
        { field: "agenda_Visible", comparison: "=", value: "Si" },
        { field: "agenda_Fecha", comparison: "<", value: fechaFormateada } // ejemplo de filtro con fecha
    ]);

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


            <h1 className={HeadingSTyle}>Eventos pasados</h1>

            <div className="flex justify-start mb-3">

                <Link href="./">

                    <ButtonTab>
                        <HiMiniCalendarDays className="text-4xl m-auto mb-3" />
                        <span className='uppercase'>Próximos eventos</span>
                    </ButtonTab>

                </Link>
                <Link href="#">

                    <ButtonTab>
                        <HiMiniCalendar className="text-4xl m-auto mb-3" />
                        <span className='uppercase'>Eventos pasados</span>
                    </ButtonTab>

                </Link>

            </div>
            

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