
import axios from 'axios';

export const fetchData = async ({ filtro, currentPage, drawCounter, perPage, sortField, sortOrder, searchText }) => {
    const requestOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            tableName: "documentacion",
            fields: ["documentacion_CodPK", "documentacion_Titulo", "documentacion_Fecha", "documentacion_Descripcion", "catDoc_Nombre", "documentacion_Archivo"],
            tableInner: "INNER JOIN fm_categoria_documentacion ON catDoc_CodPK = documentacion_catDocFK",
            filtro: filtro,
            page: currentPage,
            draw: drawCounter,
            perPage: perPage,
            sortField: sortField,
            sortOrder: sortOrder,
            searchText: searchText,
        },
    };

    try {
        const response = await axios("/api_table", requestOptions);
        return {
            data: response.data.data,
            totalRecords: response.data.recordsTotal,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
