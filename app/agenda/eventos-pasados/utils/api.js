import axios from 'axios';

export const fetchData = async ({ filtro, currentPage, drawCounter, perPage, sortField, sortOrder, searchText }) => {
    const requestOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            tableName: "agenda",
            fields: ["agenda_CodPK", "agenda_Imagen", "agenda_Fecha", "agenda_Titulo"],
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
