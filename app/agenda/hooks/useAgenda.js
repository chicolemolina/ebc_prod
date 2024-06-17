
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { RecargaContext } from '../context/RecargaContext';

export const useAgenda = () => {

    const [agenda, setAgenda] = useState([]);
    const [error, setError] = useState("");
    const { recarga } = useContext(RecargaContext);

    useEffect(() => {

        const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage
        const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));

        const requestOptions = {
            method: 'post', // Especificar el método POST
            headers: {
                'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            },
            data: {
                action: "get-eventos",
                socio_CodPK: ebc_userData.socio_CodPK
            } // Datos a enviar en el cuerpo de la solicitud
        };

        axios("/api", requestOptions)
            .then((response) => {
                if (response.data.success) {
                    setAgenda(response.data.agendaData);
                } else {
                    setError(response.data.errorMessage);
                    console.log(response.data.errorMessage);
                }
            })
            .catch((error) => {
                setError(error.message);
                console.error(error);
            });
            
    }, [recarga]);

    return { agenda, error };
};
