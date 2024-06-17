import axios from 'axios';
import toast from 'react-hot-toast';

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


export const getSocios = (setLoaded, setSocios) => 
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
            action: "get-socios"
        } // Datos a enviar en el cuerpo de la solicitud
    };

    axios("/api", requestOptions)
    .then((response) => {
        // console.log(response);
        
        if (response.data.success) 
        {
            setLoaded(true);
            setSocios(response.data.socioData);
        } //fin if (response.data.success)
        else 
            toast.error(response.data.errorMessage);
        
        
    })
    .catch((error) => {
        console.error(error);
    });
}


export const getSocio = (socio_CodPK, setLoaded, setSocio) => 
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
            action: "get-socio",
            socio_CodPK: socio_CodPK
        } // Datos a enviar en el cuerpo de la solicitud
    };

    axios("/api", requestOptions)
        .then((response) => {
            // console.log(response);

            if (response.data.success) 
            {
                setLoaded(true);
                setSocio(response.data.socioData);
            } // fin if (response.data.success) 
            else 
                toast.error(response.data.errorMessage);
            
        })
        .catch((error) => {
            console.error(error);
        });
}