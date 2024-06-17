'use client'
import { MisDatosEmpresaForm, MisDatosForm } from './components';

import Button from '../components/Buttons';
import ButtonDefault from '../components/ButtonsDefault';
import { useCheckAuthentication, useForm } from '../hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getSocio } from '../utils/api';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/userSlice';


export default function HomeMisDatos() {

    const HeadingSTyle = "mb-6 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"
    //const GridStyle="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
    const dispatch = useDispatch();

    const [usuario, setUsuario] = useState({
        socio_Nombre: "",
        socio_Apellidos: "",
        socio_Telefono: "",
        socio_Email: "",
        socio_Pass: "",
        socio_Descripcion: "",
        socio_Perfil_Linkedin: "",
        socio_Perfil_Instagram: "",
        socio_Perfil_Facebook: "",
        socio_Foto: "",
        socio_Alergia: "",
        socio_Emp_Nombre: "",
        socio_Emp_Logo: "",
        socio_Emp_Telefono: "",
        socio_Emp_Email: "",
        socio_Email_Facturacion: "",
        socio_Emp_Web: "",
        socio_Emp_Descripcion: "",
        socio_Emp_Perfil_Linkedin: "",
        socio_Emp_Perfil_Instagram: "",
        socio_Emp_Perfil_Facebook: "",
        socio_Emp_Archivo1_Nombre: "",
        socio_Emp_Archivo1: "",
        socio_Emp_Archivo2_Nombre: "",
        socio_Emp_Archivo2: "",
        socio_Emp_Archivo3_Nombre: "",
        socio_Emp_Archivo3: "",
    });

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {

        if (!loaded) 
        {
            const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));
            getSocio(ebc_userData.socio_CodPK, setLoaded, setUsuario);
        }//fin if (!loaded) 

    }, [loaded]);


    const {formState, onInputChange, setFormState} = useForm(usuario);
    useEffect(() => {
        // Actualizar el estado del formulario cuando usuario se carga
        if (usuario) {
            setFormState({
                socio_Nombre: usuario.socio_Nombre,
                socio_Apellidos: usuario.socio_Apellidos,
                socio_Telefono: usuario.socio_Telefono,
                socio_Email: usuario.socio_Email,
                socio_Pass: usuario.socio_Pass,
                socio_Descripcion: usuario.socio_Descripcion,
                socio_Perfil_Linkedin: usuario.socio_Perfil_Linkedin,
                socio_Perfil_Instagram: usuario.socio_Perfil_Instagram,
                socio_Perfil_Facebook: usuario.socio_Perfil_Facebook,
                socio_Foto: usuario.socio_Foto,
                socio_Alergia: usuario.socio_Alergia,
                socio_Emp_Nombre: usuario.socio_Emp_Nombre,
                socio_Emp_Logo: usuario.socio_Emp_Logo,
                socio_Emp_Telefono: usuario.socio_Emp_Telefono,
                socio_Emp_Email: usuario.socio_Emp_Email,
                socio_Email_Facturacion: usuario.socio_Email_Facturacion,
                socio_Emp_Web: usuario.socio_Emp_Web,
                socio_Emp_Descripcion: usuario.socio_Emp_Descripcion,
                socio_Emp_Perfil_Linkedin: usuario.socio_Emp_Perfil_Linkedin,
                socio_Emp_Perfil_Instagram: usuario.socio_Emp_Perfil_Instagram,
                socio_Emp_Perfil_Facebook: usuario.socio_Emp_Perfil_Facebook,
                socio_Emp_Archivo1_Nombre: usuario.socio_Emp_Archivo1_Nombre,
                socio_Emp_Archivo1: usuario.socio_Emp_Archivo1,
                socio_Emp_Archivo2_Nombre: usuario.socio_Emp_Archivo2_Nombre,
                socio_Emp_Archivo2: usuario.socio_Emp_Archivo2,
                socio_Emp_Archivo3_Nombre: usuario.socio_Emp_Archivo3_Nombre,
                socio_Emp_Archivo3: usuario.socio_Emp_Archivo3,
            });
        }
    }, [usuario, setFormState]);
   

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("Datos personales:", formState);
    
        const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage (o donde lo almacenes)
        const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));
    
        const formData = new FormData();
        formData.append('action', "modificar-socio");
        formData.append('socio_CodPK', ebc_userData.socio_CodPK);
    
        // Agregar los datos del formulario al FormData
        for (const key in formState) {
            formData.append(`formState[${key}]`, formState[key]);
        }
    
        // Agregar el archivo al FormData si está seleccionado
        if (formState.socio_Foto) 
            formData.append('socio_Foto', formState.socio_Foto);
        
        if (formState.socio_Emp_Logo) 
            formData.append('socio_Emp_Logo', formState.socio_Emp_Logo);
        if (formState.socio_Emp_Archivo1) 
            formData.append('socio_Emp_Archivo1', formState.socio_Emp_Archivo1);
        if (formState.socio_Emp_Archivo2) 
            formData.append('socio_Emp_Archivo2', formState.socio_Emp_Archivo2);
        if (formState.socio_Emp_Archivo3) 
            formData.append('socio_Emp_Archivo3', formState.socio_Emp_Archivo3);
        
    
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
    
            if (responseData.success) {
                
                const arrayArchivos = responseData.archivos;

                // Crear un nuevo objeto para almacenar las actualizaciones -> hago esto para modificar el nombre de los archivos
                let updatedFormState = { ...formState };
                for (let key in arrayArchivos) 
                {
                    if (arrayArchivos.hasOwnProperty(key)) 
                        updatedFormState[key] = arrayArchivos[key];
                }

                // Hacer una única llamada a setFormState con todas las actualizaciones
                setFormState(updatedFormState);

                // para actualizar el valor del usuario que aparece en navbar
                dispatch(setUserData(formState));

                toast.success('¡Los datos se han modificado con éxito!');
            } else {
                toast.error('Ha ocurrido un error al modificar los datos.');
                console.log(responseData.errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <div className="mx-[40px] mt-[100px] md:ml-[300px]">

                <h1 className={HeadingSTyle}>Mis datos</h1>


                <div className="mb-[100px]">

                    <form onSubmit={handleSubmit} className="space-y-3">

                        <div className='md:flex md:w-full sm:w-full gap-4 mb-4 md:h-full'>

                            {/* DATOS PERSONALES */}
                            <MisDatosForm onInputChange={onInputChange} formState={formState} />
                            

                            {/* DATOS DE LA EMPRESA */}
                            <MisDatosEmpresaForm onInputChange={onInputChange} formState={formState} />

                        </div>

                        <div className='flex md:justify-end justify-center w-full shadow-sm bg-white rounded-md md:py-7 md:px-7 py-4 px-4'>

                            <ButtonDefault>
                                CANCELAR
                            </ButtonDefault>
                            <Button>
                                GUARDAR
                            </Button>

                        </div>

                    </form>

                </div>

            </div>

        </>
    );
}



