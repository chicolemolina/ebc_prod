import { format } from 'date-fns';
import { cambiaf_a_formato_espanol } from "@/utils";
import {
    HiMiniCalendarDays,
    HiMiniMapPin
} from "react-icons/hi2";
import { useContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { RecargaContext } from '../context/RecargaContext';


const ModalInscribirme = ({ onClose, evento }) => {

    const { agenda_CodPK, agenda_Titulo, agenda_Fecha, agenda_Hora, agenda_Lugar } = evento;

    const { setRecarga } = useContext(RecargaContext);

   
    // Función para manejar el clic en el botón "Confirmar"
    const handleConfirmar = () => {

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
                action: "anularIns-evento",
                socio_CodPK: ebc_userData.socio_CodPK,
                agenda_CodPK: agenda_CodPK
            } // Datos a enviar en el cuerpo de la solicitud
        };
    
        axios("/api", requestOptions)
            .then((response) => {
                // console.log(response);
    
                if (response.data.success) 
                {
                    setRecarga(prevRecarga => prevRecarga + 1);   
                    toast.success('¡Inscripción anulada con éxito!');
                }
                else 
                    toast.error(response.data.errorMessage);
                
            })
            .catch((error) => {
                console.error(error);
            });

        // Llamar a onClose para cerrar el modal
        onClose();
    };


    return (
        <>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Va a anular su inscripción al evento:
                </h3>
                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Cerrar modal</span>
                </button>
            </div>

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

      
            </div>

            <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" onClick={handleConfirmar} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirmar</button>
                <button data-modal-hide="default-modal" onClick={onClose} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
            </div>
        </>
    );
}

export default ModalInscribirme;