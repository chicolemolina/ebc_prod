'use client'
import React, { useContext, useEffect, useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { FlexBox, Button2, ButtonDefault, Modal } from '@/app/components';
import {
    HiMiniCalendarDays,
    HiMiniMapPin,
    HiMiniPencilSquare,
    HiMiniXMark
} from "react-icons/hi2";
import { PiForkKnifeFill } from "react-icons/pi";
import axios from "axios";
import { cambiaf_a_formato_espanol, formatoNumero } from "../../utils/fun_aux";
import { format } from "date-fns";
import ModalInscribirme from './ModalInscribirme'; 
import { RecargaContext } from '../context/RecargaContext';
import Link from "next/link";


const DetalleEvento = ({ children, className, params }) => {

    const LiStyle = "flex items-center justify-start text-gray-800 mb-1"
    const IconStyle = "mr-3"

    const { agenda_CodPK } = params;
    const { recarga } = useContext(RecargaContext);

    const [evento, setEvento] = useState([]);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {

   
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
                action: "get-evento",
                agenda_CodPK: agenda_CodPK,
                socio_CodPK: ebc_userData.socio_CodPK
            } // Datos a enviar en el cuerpo de la solicitud
        };

        axios("/api", requestOptions)
            .then((response) => {
                // console.log(response);

                if (response.data.success) {
                    setEvento(response.data.eventoData);
                } else {
                    setError(response.data.errorMessage);
                    console.log(error);
                }

            })
            .catch((error) => {
                console.error(error);
            });
        

    }, [recarga]);



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const { agenda_Titulo, agenda_Imagen, agenda_Fecha, agenda_Hora, agenda_Lugar, agenda_FechaMax_Inscripcion, agenda_FechaMax_Cancelacion, agenda_Precio_Socio, agenda_Precio_Visible, agenda_Descripcion, asistente_CodPK } = evento;

    return (

        <FlexBox>
            {
                Object.keys(evento).length > 0 &&
                (
                    
                    <div className="block md:block 2xl:flex md:gap-8">
                        <div className="w-full md:w-full 2xl:w-2/5 md:h-80 2xl:h-full overflow-hidden">
                            <img src={`https://socios.excellencebusinessclub.com/archivos/agenda/${ agenda_Imagen }`} className="rounded w-full object-cover" alt="" />
                        </div>
                        <div className='w-full md:w-full 2xl:w-3/5 py-3 md:mt-4'>

                            <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-3xl text-[#181c32]'>{agenda_Titulo}</h3>

                            <ul className="mt-6 text-sm">
                                <li className={LiStyle}>
                                    <HiMiniCalendarDays className={IconStyle} />  {cambiaf_a_formato_espanol(agenda_Fecha)} - {format(new Date(`1970-01-01T${agenda_Hora}Z`), 'HH:mm')}
                                </li>
                                <li className={LiStyle}>
                                    <HiMiniMapPin className={IconStyle} />  Lugar: {agenda_Lugar}
                                </li>
                                <li className={LiStyle}>
                                    <HiMiniPencilSquare className={IconStyle} />  Fecha Máx. Inscripción: {cambiaf_a_formato_espanol(agenda_FechaMax_Inscripcion)}
                                </li>
                                <li className={LiStyle}>
                                    <HiMiniXMark className={IconStyle} />   Fecha Máx. Cancelación: {cambiaf_a_formato_espanol(agenda_FechaMax_Cancelacion)}
                                </li>

                                {
                                    agenda_Precio_Visible == "Si" &&
                                        <li className={LiStyle}>
                                            <PiForkKnifeFill className={IconStyle} />   Coste Catering: { formatoNumero(agenda_Precio_Socio) } €
                                        </li>
                                }

                            </ul>

                            <div className="py-2 border-b-2 border-[#f4eeee]"></div>

                            <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-lg text-[#181c32] py-4'>Descripción del evento</h3>

                
                            <div className="text-sm mb-4 text-gray-800 whitespace-pre-line">
                                {ReactHtmlParser(agenda_Descripcion)}
                            </div>

                            <div className='flex md:justify-end justify-center w-full md:py-7 md:px-7 py-4 px-4'>

                                <Link href={`/agenda/${agenda_CodPK}/eventos-asistentes`}>
                                    <ButtonDefault>
                                        ASISTENTES
                                    </ButtonDefault>
                                </Link>

                                { 
                                    (!asistente_CodPK) 
                                    ? 
                                        (new Date(agenda_FechaMax_Inscripcion) >= new Date()) &&
                                            <ButtonDefault onClick={openModal}>
                                                INSCRIBIRME
                                            </ButtonDefault>

                                    :
                                        (new Date(agenda_FechaMax_Inscripcion) >= new Date()) &&
                                            <Link href={`/agenda/${agenda_CodPK}/eventos-invitados`}>
                                                <Button2>
                                                    AÑADIR INVITADOS
                                                </Button2>
                                            </Link>
                                }

                            </div>

                        </div>
                    </div>
                ) 
            }

            {
                isModalOpen && 
                <Modal>
                    <ModalInscribirme onClose={closeModal} evento={evento} />
                </Modal>
            }

        </FlexBox>
    )
}

export default DetalleEvento