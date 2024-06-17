
import {
    HiMiniUserCircle ,
    HiEnvelope ,
    HiMiniBuildingOffice  ,
    HiDevicePhoneMobile 
} from "react-icons/hi2";
import { FlexBox } from '@/components';
import Link from 'next/link';
import Image from "next/image"

export const ModalSustituto = ({ onClose, socio }) => {

    const {socio_CodPK, socio_Foto, socio_Nombre, socio_Apellidos, socio_Emp_Nombre, asistente_Sustituto_Nombre, asistente_Sustituto_Email, asistente_Sustituto_Telefono} = socio;
    
    return (
        <>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Datos del asistente Representante
                </h3>
                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Cerrar modal</span>
                </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              
                <ul className="mt-5 text-sm">
                    <li className='flex items-center justify-start text-gray-400'>
                        <HiMiniUserCircle className="mr-3" /> <span className='font-black mr-3'>Nombre:</span> {asistente_Sustituto_Nombre}
                    </li>
                    <li className='flex items-center justify-start text-gray-400'>
                        <HiDevicePhoneMobile className="mr-3" /> <span className='font-black mr-3'>Teléfono:</span> {asistente_Sustituto_Telefono}
                    </li>
                    <li className='flex items-center justify-start text-gray-400'>
                        <HiEnvelope className="mr-3" />  <span className='font-black mr-3'>Email:</span> {asistente_Sustituto_Email}
                    </li>
                    <li className='flex items-center justify-start text-gray-400'>
                        <HiMiniBuildingOffice  className="mr-3" />  <span className='font-black mr-3'>Empresa:</span> {socio_Emp_Nombre}
                    </li>
                </ul>
                
                <h4 className="font-semibold text-gray-900 dark:text-white">Representa en este evento al socio:</h4>



                <FlexBox className="text-center w-100">

                    <Link href={`/socios/detalle?socio_CodPK=${socio_CodPK}`}>
                        <Image
                            src={`http://01-servidor/react_back/archivos/socio_fotos/${socio_Foto}`}
                            width={160}
                            height={160}
                            alt="Nombre socio"
                            className="rounded-md mb-4 m-auto"
                        />
                    </Link>

                    <h3 className="text-1xl font-semibold tracking-normal"> <Link href={`/socios/detalle?socio_CodPK=${socio_CodPK}`} className="hover:text-[#d0a53d] ease duration-100">{socio_Nombre} {socio_Apellidos} </Link></h3>
        
                    <Link href={`/socios/detalle?socio_CodPK==${socio_CodPK}`} className="text-[#d0a53d]">{socio_Emp_Nombre}</Link>
                </FlexBox>

      
            </div>

        </>
    );
}

