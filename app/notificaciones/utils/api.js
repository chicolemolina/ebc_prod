import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchData = async ({ filtro, currentPage, drawCounter, perPage, sortField, sortOrder, searchText }) => {
    const requestOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            tableName: "notificacion",
            fields: ["notificacion_CodPK", "notificacion_Fecha", "notificacion_Asunto", "notificacion_Leido", "notificacion_Estado"],
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

export const cambioLeido = (id, leido, setRecarga) => 
{

    // Define la lógica para marcar como leído/no leído
    const nuevoEstado = leido === "Si" ? "No" : "Si";

    const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage (o donde lo almacenes)
    const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));
    
    const requestOptions = {
        method: 'post', // Especificar el método POST
        headers: {
            'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        data: {
            action: "marcar-leido",
            socio_CodPK: ebc_userData.socio_CodPK,
            notificacion_CodPK: id,
            nuevoEstado: nuevoEstado
        } // Datos a enviar en el cuerpo de la solicitud
    };

    axios("/api", requestOptions)
        .then((response) => {
            // console.log(response);

            if (response.data.success) 
            {
                setRecarga(prevRecarga => prevRecarga + 1);   
                toast.success('¡Estado modificado con éxito!');
            }
            else 
                toast.error(response.data.errorMessage);
            
        })
        .catch((error) => {
            console.error(error);
        });

};


export const cambioMostrar = (id, setRecarga) => 
{

    const notificacion_Mostrar = "No";

    const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage (o donde lo almacenes)
    const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));
    
    const requestOptions = {
        method: 'post', // Especificar el método POST
        headers: {
            'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        },
        data: {
            action: "marcar-mostrar",
            socio_CodPK: ebc_userData.socio_CodPK,
            notificacion_CodPK: id,
            notificacion_Mostrar: notificacion_Mostrar
        } // Datos a enviar en el cuerpo de la solicitud
    };

    axios("/api", requestOptions)
        .then((response) => {
            // console.log(response);

            if (response.data.success) 
            {
                setRecarga(prevRecarga => prevRecarga + 1);   
                toast.success('¡Notificación ocultada con éxito!');
            }
            else 
                toast.error(response.data.errorMessage);
            
        })
        .catch((error) => {
            console.error(error);
        });


}