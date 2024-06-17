import { useState } from "react";

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value, type } = target;

        // Si el tipo de campo es "file", actualiza el estado con el archivo seleccionado
        if (type === "file") {
            setFormState({
                ...formState,
                [name]: target.files[0] // Solo toma el primer archivo seleccionado
            });
        } else {
            setFormState({
                ...formState,
                [name]: value
            });
        }
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        setFormState
    };
};






