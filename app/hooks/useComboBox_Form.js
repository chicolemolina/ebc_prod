import axios from "axios";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";

export const useComboBox_Form = (actionVar, CodPKVar, TextoInputVar, auxData, campoFormulario, formState, setFormState, defaultOptionId = null) => {
    const [selectedId, setSelectedId] = useState(defaultOptionId);
    const [opciones, setOpciones] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        if (!loaded) {
            const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage (o donde lo almacenes)

            const requestOptions = {
                method: 'post', // Especificar el método POST
                headers: {
                    'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    action: actionVar
                } // Datos a enviar en el cuerpo de la solicitud
            };

            axios("/api", requestOptions)
                .then((response) => {
                    // console.log(response);

                    if (response.data.success) {
                        setLoaded(true);

                        // Agregar una clave única a cada opción
                        // const opcionesConClaves = response.data[auxData].map(opcion => ({
                        //     ...opcion,
                        //     key: opcion[CodPKVar]
                        // }));
                       
                        setOpciones(response.data[auxData]);
                        // setOpciones(opcionesConClaves);
                    } 
                    else 
                        toast.error(response.data.errorMessage);

                })
                .catch((error) => {
                    console.error(error);
                });

        }


        setSelectedId(defaultOptionId);
    }, [loaded, defaultOptionId]);


    // Encuentra la opción seleccionada usando el id
    const selectedOption = opciones.find(opcion => opcion[CodPKVar] === selectedId) || null;
    // const getOptionLabel = (option) => TextoInputVar.map(field => option[field]).join(' - '); [campo1, campo2] por si quiero mostrar dos campos en el label
    const getOptionLabel = (option) => option[TextoInputVar];
    const getOptionKey = (option) => option[CodPKVar];
    const isOptionEqualToValue = (option, value) => option[CodPKVar] === value[CodPKVar];

    

    const onChangeFunction = (event, newValue) => {
        setSelectedId(newValue ? newValue[CodPKVar] : null);
    
        const field = campoFormulario;
        const value = newValue ? newValue[CodPKVar] : 0;
        // console.log(field,value);

        setFormState({
            ...formState,
            [field]: value // Solo toma el primer archivo seleccionado
        });
        
    };


    return {
        opciones,
        selectedOption,
        getOptionLabel,
        isOptionEqualToValue,
        onChangeFunction,
        getOptionKey
    };
}




