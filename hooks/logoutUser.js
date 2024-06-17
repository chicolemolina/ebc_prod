import axios from 'axios';

// const baseURL = "https://proyectos.nubeado.com/backend_react/api/api_conexion.php";

export const logoutUser = async () => {

    // AXIOS
    const requestData = {
        action: "logoutUser"
    };

            
    // Configuración de la solicitud Axios
    const requestOptions = {
        method: 'post', // Especificar el método POST
        headers: {
            'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
            'Access-Control-Allow-Origin': '*'
        },
        data: requestData // Datos a enviar en el cuerpo de la solicitud
    };


    // Realizar la solicitud Axios
    return await axios("/api", requestOptions)
        .then(({ data }) => {
            // Almacenar las claves que deben eliminarse para evitar problemas al modificar el sessionStorage mientras se itera
        const keysToRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key.startsWith('ebc_')) {
                keysToRemove.push(key);
            }
        }

        // Eliminar las claves almacenadas
        keysToRemove.forEach(key => sessionStorage.removeItem(key));

            return data;
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);

            throw error; 
        });

}