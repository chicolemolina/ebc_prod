import { useEffect, useState } from 'react';
import axios from 'axios';

export const usePromo = (partner_CodPK) => 
{
    const [promo, setPromo] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!loaded) {
            const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage

            const requestOptions = {
                method: 'post', // Especificar el método POST
                headers: {
                    'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    action: "get-promo",
                    partner_CodPK: partner_CodPK
                } // Datos a enviar en el cuerpo de la solicitud
            };

            axios("/api", requestOptions)
                .then((response) => {
                    if (response.data.success) 
                    {
                        setLoaded(true);
                        setPromo(response.data.partnerData);
                    } 
                    else 
                    {
                        setError(response.data.errorMessage);
                        console.error(response.data.errorMessage);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                    console.error(error);
                });
                
        }
    }, [loaded, partner_CodPK]);

    useEffect(() => {
        if (loaded && promo) {
            document.title = `${promo.partner_Titulo}`; // Ajusta según la estructura de los datos
        }
    }, [loaded, promo]);

    return { promo, loaded, error };
};
