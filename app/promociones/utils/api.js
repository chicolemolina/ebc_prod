
import axios from 'axios';

export const fetchData = async ({ filtro, currentPage, drawCounter, perPage, sortField, sortOrder, searchText }) => {
    const requestOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            tableName: "partner",
            fields: ["partner_CodPK", "partner_Fecha", "socio_Nombre", "socio_Apellidos", "partner_Titulo"],
            tableInner: "INNER JOIN socio ON socio_CodPK = partner_SocioFK INNER JOIN fm_categoria_partner ON catPart_CodPK = partner_catPartFK",
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
