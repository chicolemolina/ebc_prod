import axios from "axios";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";

export const useComboBox = (actionVar, CodPKVar, TextoInputVar, auxData, setFiltro) => {
    const [selectedId, setSelectedId] = useState(null);
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
                    } else 
                        toast.error(response.data.errorMessage);

                })
                .catch((error) => {
                    console.error(error);
                });

        }

    }, [loaded]);



    // Encuentra la opción seleccionada usando el id
    const selectedOption = opciones.find(opcion => opcion[CodPKVar] === selectedId) || null;
    // const getOptionLabel = (option) => TextoInputVar.map(field => option[field]).join(' - '); [campo1, campo2] por si quiero mostrar dos campos en el label
    const getOptionLabel = (option) => option[TextoInputVar];
    const getOptionKey = (option) => option[CodPKVar];
    const isOptionEqualToValue = (option, value) => option[CodPKVar] === value[CodPKVar];

    
    // const onChangeFunction = (event, newValue) => {
    //     setSelectedId(newValue ? newValue[CodPKVar] : null);

    //     const field = CodPKVar;
    //     const value = newValue ? newValue[CodPKVar] : null;
        
    //     setFiltro(prevFiltro => {
    //         const newFields = [...prevFiltro.fields];
    //         const newValues = [...prevFiltro.values];

    //         if (value == null) 
    //         {
    //             // Si el valor es null, elimina el campo del array de campos y su valor asociado
    //             const index = newFields.indexOf(field);
    //             if (index !== -1) {
    //                 newFields.splice(index, 1);
    //                 newValues.splice(index, 1);
    //             }
    //         }// fin if (value == null) 
    //         else 
    //         {
    //             if (!newFields.includes(field)) {
    //                 newFields.push(field);
    //                 newValues.push(value);
    //             } else {
    //                 const index = newFields.indexOf(field);
    //                 newValues[index] = value;
    //             }
    //         }// fin else de if (value == null) 
            

    //         return {
    //             fields: newFields,
    //             values: newValues,
    //         };
    //     });
    // };

    const onChangeFunction = (event, newValue) => {
        setSelectedId(newValue ? newValue[CodPKVar] : null);
    
        const field = CodPKVar;
        const value = newValue ? newValue[CodPKVar] : null;
    
        setFiltro(prevFiltro => {
            let newFilters = [...prevFiltro];
    
            if (value == null) {
                // Si el valor es null, elimina el filtro del array
                newFilters = newFilters.filter(f => f.field !== field);
            } else {
                const existingFilterIndex = newFilters.findIndex(f => f.field === field);
    
                if (existingFilterIndex !== -1) {
                    // Actualiza el valor del filtro existente
                    newFilters[existingFilterIndex].value = value;
                } else {
                    // Agrega un nuevo filtro
                    newFilters.push({ field, comparison: "=", value });
                }
            }
    
            return newFilters;
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




