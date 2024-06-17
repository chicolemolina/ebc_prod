
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchData = async ({ filtro, currentPage, drawCounter, perPage, sortField, sortOrder, searchText }) => {
    const requestOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            tableName: "agenda_invitado",
            fields: ["invitado_CodPK", "invitado_Nombre", "invitado_Empresa", "invitado_Actividad", "socio_Nombre", "socio_Apellidos", "invitado_SocioFK", "agenda_FechaMax_Inscripcion", "agenda_Fecha", "invitado_Pagado", "invitado_AgendaFK"],
            tableInner: "LEFT JOIN socio ON socio_CodPK = invitado_SocioFK INNER JOIN agenda ON agenda_CodPK = invitado_AgendaFK",
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


export const bajaInvitado = (id, setRecarga) => 
{

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
            action: "baja-invitado",
            socio_CodPK: ebc_userData.socio_CodPK,
            invitado_CodPK: id
        } // Datos a enviar en el cuerpo de la solicitud
    };

    axios("/api", requestOptions)
        .then((response) => {
            // console.log(response);

            if (response.data.success) 
            {
                setRecarga(prevRecarga => prevRecarga + 1);   
                toast.success('¡Invitado dado de baja con éxito!');
            }
            else 
                toast.error(response.data.errorMessage);
            
        })
        .catch((error) => {
            console.error(error);
        });


}