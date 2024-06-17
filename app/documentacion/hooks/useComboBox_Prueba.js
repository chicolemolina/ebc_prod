import axios from "axios";
import { useEffect, useState } from "react";

export const useComboBox = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [filtro, setFiltro] = useState({
        fields: [],
        values: []
    });

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
                    action: "get-catDocumentacion"
                } // Datos a enviar en el cuerpo de la solicitud
            };

            axios("/api", requestOptions)
                .then((response) => {
                    // console.log(response);

                    if (response.data.success) {
                        setLoaded(true);
                        setCategorias(response.data.categoriaData);
                    } else {
                        setError(response.data.errorMessage);
                        console.log(error);
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        }

    }, [loaded]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        // formData.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });

        console.log(formData);

        const newFields = [...filtro.fields];
        const newValues = [...filtro.values];
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
            const index = newFields.indexOf(key);

            if (index !== -1) {
                newValues[index] = value;
            } else {
                newFields.push(key);
                newValues.push(value);
            }

        });
        setFiltro({ fields: newFields, values: newValues });

        console.log(newFields);

        // Aquí puedes manejar el valor seleccionado como necesites, por ejemplo enviarlo a un servidor
    };

    // Encuentra la opción seleccionada usando el id
    const selectedOption = categorias.find(film => film.catDoc_CodPK === selectedId) || null;
    const getOptionLabel = (option) => option.catDoc_Nombre;
    const isOptionEqualToValue = (option, value) => option.catDoc_CodPK === value.catDoc_CodPK;
    const onChangeFunction = (event, newValue) => {
        setSelectedId(newValue ? newValue.catDoc_CodPK : null);
    }

    return {
        categorias,
        handleSubmit,
        selectedOption,
        getOptionLabel,
        isOptionEqualToValue,
        onChangeFunction
    };
}




