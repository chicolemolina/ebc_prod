
'use client'

import { useEffect, useState } from "react";
import Button from '../../components/Buttons';
import ButtonDefault from "../../components/ButtonsDefault";
import ComboBox from '../../components/ComboBox/ComboBox';
import { useComboBox_Form, useForm } from "../../hooks";
import axios from "axios";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

function InvitadoForm({params}) {

    const { agenda_CodPK, invitado_CodPK = 0 } = params;

    const router = useRouter();
    const [perteneceEmpresa, setPerteneceEmpresa] = useState(false);

    const handlePerteneceEmpresa = (event) => {
        setPerteneceEmpresa(event.target.value === 'Si');
    };


    const [invitado, setInvitado] = useState({
        invitado_Nombre: "",
        invitado_Telefono: "",
        invitado_Email: "",
        invitado_Alergia: "",
        invitado_PerteneceEmpresa: "No",
        invitado_Empresa: "",
        invitado_Actividad: "",
        invitado_ProvinciaFK: 0,
    })

    useEffect(() => {

        if (invitado_CodPK != 0) 
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
                    action: "get-invitado",
                    socio_CodPK: ebc_userData.socio_CodPK,
                    invitado_CodPK: invitado_CodPK,
                } // Datos a enviar en el cuerpo de la solicitud
            };

            axios("/api", requestOptions)
                .then((response) => {
                    // console.log(response);

                    if (response.data.success) {
                        setInvitado(response.data.invitadoData);
                    } else {
                        setError(response.data.errorMessage);
                        console.log(error);
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }, [invitado_CodPK]);

    

    const {formState, onInputChange, setFormState} = useForm(invitado);

    useEffect(() => {
        // Actualizar el estado del formulario cuando usuario se carga
        if (invitado) {
            setFormState(invitado);
        }
    }, [invitado, setFormState]);

    const handleBothChanges = (event) => {
        onInputChange(event);
        handlePerteneceEmpresa(event);
    };
    
   


    const {
        opciones,
        // opciones: opcionesProvincias, si quisiera tener varios compos le pongo : y un identificador
        selectedOption,
        getOptionLabel,
        isOptionEqualToValue,
        onChangeFunction,
        getOptionKey
    } = useComboBox_Form("get-Provincias", "prov_CodPK", "prov_Nombre", "provinciaData", "invitado_ProvinciaFK", formState, setFormState, invitado.invitado_ProvinciaFK);   

 
    const {invitado_Nombre, invitado_Telefono, invitado_Email, invitado_Alergia, invitado_PerteneceEmpresa, invitado_Empresa, invitado_Actividad} = formState;


    // PARA QUE SI PERTENECE LA EMPRESA AL CARGAR LA PÁGINA NO MUESTRE LOS CAMPOS DE LA EMPRESA
    useEffect(() => {
        const event = { target: { name: 'invitado_PerteneceEmpresa', value: invitado_PerteneceEmpresa }};
        handleBothChanges(event);
    }, [invitado_PerteneceEmpresa]); // El array vacío asegura que esto se ejecute solo una vez al cargar la página


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage (o donde lo almacenes)
        const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));
    
        const formData = new FormData();

        if (invitado_CodPK != 0) 
        {
            formData.append('action', "modificar-invitado");
            formData.append('invitado_CodPK', invitado_CodPK);
        }// fin if (invitado_CodPK != 0) 
        else 
            formData.append('action', "insertar-invitado");

        formData.append('socio_CodPK', ebc_userData.socio_CodPK);
        formData.append('agenda_CodPK', agenda_CodPK);
    
        // Agregar los datos del formulario al FormData
        for (const key in formState) {
            formData.append(`formState[${key}]`, formState[key]);
        }
    
        const requestOptions = {
            method: 'POST', // Especificar el método POST
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        };
    
        try {
            const response = await axios("/api", requestOptions);
            const responseData = response.data;
    
            if (responseData.success) 
            {
                toast.success('¡Acción realizada con éxito!');

                if (invitado_CodPK != 0) 
                    router.push(`/agenda/${agenda_CodPK}/eventos-asistentes`); 
                else 
                    router.push(`/agenda/${agenda_CodPK}`); 
            } // fin if (responseData.success) 
            else 
                toast.error('Ha ocurrido un error al realizar la acción sobre el invitado.');

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <div className="mb-4 md:min-w-[600px]">

            <form onSubmit={handleSubmit}>
                <div className="border-b-2 border-neutral-100 py-3 dark:border-white/10 mb-8">
                    <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-2xl text-slate-500'>
                        {invitado_CodPK !== 0 ? 'Modificar Invitado' : 'Insertar Invitado'}
                    </h3>
                </div>

                <div className="grid md:grid-cols-1 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="invitado_Nombre"
                        type="text"
                        name="invitado_Nombre"
                        placeholder="Nombre"
                        value={invitado_Nombre}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="grid gap-2 md:grid-cols-2 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="invitado_Telefono"
                        type="text"
                        name="invitado_Telefono"
                        placeholder="Teléfono"
                        value={invitado_Telefono}
                        onChange={onInputChange}
                        required
                    />
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="invitado_Email"
                        type="email"
                        name="invitado_Email"
                        placeholder="Email"
                        value={invitado_Email}
                        onChange={onInputChange}
                        required
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-1 mb-3">

                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="invitado_Alergia"
                        type="text"
                        name="invitado_Alergia"
                        value={invitado_Alergia}
                        onChange={onInputChange}
                        placeholder="Alergia"
                        required
                    />
                </div>

                <div className="border-b-2 border-neutral-100 py-3 dark:border-white/10 mt-5 mb-5">
                    <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-2xl text-slate-500'>Pertenece empresa</h3>
                </div>

                <div className="grid md:grid-cols-1 mb-2">

                    <select name="invitado_PerteneceEmpresa" value={invitado_PerteneceEmpresa} onChange={handleBothChanges} className="w-full rounded-md py-[12px] border-0 pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100">
                        <option value="No">No</option>
                        <option value="Si">Si</option>
                    </select>

                </div>

                {
                    (!perteneceEmpresa) && (

                        <div>
                            <div className="grid gap-4 md:grid-cols-1 mb-3">
                                <input
                                    className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                                    id="invitado_Empresa"
                                    type="text"
                                    name="invitado_Empresa"
                                    value={invitado_Empresa}
                                    onChange={onInputChange}
                                    placeholder="Empresa"
                                    required
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-1 mb-3">
                                <input
                                    className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                                    id="invitado_Actividad"
                                    type="text"
                                    name="invitado_Actividad"
                                    value={invitado_Actividad}
                                    onChange={onInputChange}
                                    placeholder="Actividad"
                                    required
                                />
                            </div>

                            <div className="relative grid gap-4 md:grid-cols-1 mb-2">
                                    
                                <ComboBox
                                    tamanyoGrid={2}
                                    arrayDatos={opciones}
                                    selectedOption={selectedOption}
                                    getOptionLabel={getOptionLabel}
                                    isOptionEqualToValue={isOptionEqualToValue}
                                    onChangeFunction={onChangeFunction}
                                    name={"prov_CodPK"}
                                    getOptionKey={getOptionKey}
                                    placeholder="Provincia"
                                />
                            </div>
                        </div>

                    )}

                <div className="flex justify-end pt-10">

                    <ButtonDefault>
                        BORRAR
                    </ButtonDefault>

                    <Button>
                        GUARDAR INVITADO
                    </Button>
                </div>
            </form>

        </div>
    );
}

export default InvitadoForm



