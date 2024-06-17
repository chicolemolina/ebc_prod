'use client';

import DataTable from 'react-data-table-component';
import { NoDataComponent, BuscadorTabla, PaginationComponentOptions } from '@/components/Datatable';
import { FormFiltros, ComboBox } from '@/components/ComboBox';
import { useDataTable } from './hooks';
import { useComboBox } from '@/hooks';
import { useState } from 'react';

export default function Documentacion() {


    const HeadingStyle = "mb-4 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl";
    const [filtro, setFiltro] = useState([]);

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

    
    const createFiltroCategoria = (action, nombreCodPK, textoMostrar, auxData, placeholder) => ({
        action,
        nombreCodPK,
        textoMostrar,
        auxData,
        placeholder,
    });

    const filtrosCategorias = [
        createFiltroCategoria("get-catDocumentacion", "catDoc_CodPK", "catDoc_Nombre", "categoriaData", "categoría"),
        // createFiltroCategoria("get-socios", "socio_CodPK", "socio_Nombre", "socioData", "socio"),
        // Agrega más configuraciones según sea necesario
    ];

    return (

        <div className="mx-[40px] mt-[100px] md:ml-[300px]">

            <h1 className={HeadingStyle}>Documentación</h1>

            <FormFiltros>
                {filtrosCategorias.map((filtroCategoria, index) => {

                    const {
                        opciones,
                        selectedOption,
                        getOptionLabel,
                        isOptionEqualToValue,
                        onChangeFunction,
                        getOptionKey
                    } = useComboBox(filtroCategoria.action, filtroCategoria.nombreCodPK, filtroCategoria.textoMostrar, filtroCategoria.auxData, setFiltro);
                    
                    return (
                        <ComboBox
                            key={index}
                            tamanyoGrid={2}
                            arrayDatos={opciones}
                            selectedOption={selectedOption}
                            getOptionLabel={getOptionLabel}
                            isOptionEqualToValue={isOptionEqualToValue}
                            onChangeFunction={onChangeFunction}
                            name={filtroCategoria.nombreCodPK}
                            getOptionKey={getOptionKey}
                            placeholder={filtroCategoria.placeholder}
                        />
                    );
                })}
            </FormFiltros>
                

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
                // onFilter={(filteredData) => setData(filteredData)}
                subHeader
                subHeaderComponent={
                    <BuscadorTabla searchText={searchText} handleSearchChange={handleSearchChange} />
                }
            />

        </div>

    );
}

