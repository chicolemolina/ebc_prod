import { format } from 'date-fns';
import { cambiaf_a_formato_espanol } from '../../utils/fun_aux';
import {
    HiMiniCalendarDays,
    HiMiniMapPin
} from "react-icons/hi2";
import { useContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { RecargaContext } from '../context/RecargaContext';
import { useForm } from '../../hooks';
import { Button } from '../../components/button';


const ModalInscribirme = ({ onClose, evento }) => {

    const { agenda_CodPK, agenda_Titulo, agenda_Fecha, agenda_Hora, agenda_Lugar } = evento;

    const { setRecarga } = useContext(RecargaContext);

    const {formState, onInputChange} = useForm({
        asistente_Sustituto_Nombre: "",
        asistente_Sustituto_Email: "",
        asistente_Sustituto_Telefono: "",
        asistente_Sustituto_Alergia: ""
    });

    const {asistente_Sustituto_Nombre, asistente_Sustituto_Email, asistente_Sustituto_Telefono, asistente_Sustituto_Alergia} = formState;

    // Función para manejar el clic en el botón "Confirmar"
    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage (o donde lo almacenes)
        const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));
        
        const formData = new FormData();

        formData.append('action', "insertar-sustituto");
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
                setRecarga(prevRecarga => prevRecarga + 1);   
                toast.success('¡Acción realizada con éxito!');
                router.push(`/agenda`); 
            } // fin if (responseData.success) 
            else 
                toast.error('Ha ocurrido un error al realizar la acción.');

        } catch (error) {
            console.error('Error:', error);
        }


        // Llamar a onClose para cerrar el modal
        onClose();
    };


    return (
        <>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Va a inscribir un sustituto al evento:
                </h3>
                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Cerrar modal</span>
                </button>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="p-4 md:p-5 space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{ agenda_Titulo }</h4>

                    <ul className="mt-5 text-sm">
                        <li className='flex items-center justify-start text-gray-400'>
                            <HiMiniCalendarDays className="mr-3" /> { cambiaf_a_formato_espanol(agenda_Fecha) } - { format(new Date(`1970-01-01T${agenda_Hora}Z`), 'HH:mm') }
                        </li>
                        <li className='flex items-center justify-start text-gray-400'>
                            <HiMiniMapPin className="mr-3" />  Lugar: { agenda_Lugar }
                        </li>
                    </ul>

                    <hr></hr>

                    <div className="grid md:grid-cols-1 mb-3">
                        <input
                            className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                            id="asistente_Sustituto_Nombre"
                            type="text"
                            name="asistente_Sustituto_Nombre"
                            placeholder="Nombre"
                            value={asistente_Sustituto_Nombre}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2 md:grid-cols-2 mb-3">
                        <input
                            className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                            id="asistente_Sustituto_Telefono"
                            type="text"
                            name="asistente_Sustituto_Telefono"
                            placeholder="Teléfono"
                            value={asistente_Sustituto_Telefono}
                            onChange={onInputChange}
                            required
                        />
                        <input
                            className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                            id="asistente_Sustituto_Email"
                            type="email"
                            name="asistente_Sustituto_Email"
                            placeholder="Email"
                            value={asistente_Sustituto_Email}
                            onChange={onInputChange}
                            required
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-1 mb-3">

                        <input
                            className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                            id="asistente_Sustituto_Alergia"
                            type="text"
                            name="asistente_Sustituto_Alergia"
                            value={asistente_Sustituto_Alergia}
                            onChange={onInputChange}
                            placeholder="Alergia"
                            required
                        />
                    </div>

                </div>

                <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Button>
                        Confirmar
                    </Button>
                    <button data-modal-hide="default-modal" onClick={onClose} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
                </div>

            </form>
        </>
    );
}

export default ModalInscribirme;