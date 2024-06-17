'use client'

import { useState } from "react";
import Link from 'next/link';
import FlexBox from '../../components/box';
import Button from '../../components/Buttons';
import ButtonDefault from '../../components/ButtonsDefault';
import { formatoNumero, cambiaf_a_formato_espanol } from '../../utils/fun_aux';
import { format } from 'date-fns';
import {
    HiMiniCalendarDays,
    HiMiniMapPin,
    HiMiniPencilSquare,
    HiMiniXMark,
    HiCurrencyEuro 
} from "react-icons/hi2";
import Modal from '../../components/Modal'; 
import ModalInscribirme from './ModalInscribirme'; 
import ModalAnularIns from './ModalAnularIns'; 
import ModalIns_Sustituto from './ModalIns_Sustituto'; 

const FichaEvento = ({ evento }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen_Anular, setIsModalOpen_Anular] = useState(false);
    const [isModalOpen_Sustituto, setIsModalOpen_Sustituto] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModal_Anular = () => setIsModalOpen_Anular(true);
    const closeModal_Anular = () => setIsModalOpen_Anular(false);

    const openModal_Sustituto = () => setIsModalOpen_Sustituto(true);
    const closeModal_Sustituto = () => setIsModalOpen_Sustituto(false);


    const {agenda_CodPK, agenda_Titulo, agenda_Imagen, agenda_Fecha, agenda_Hora, agenda_Lugar, agenda_FechaMax_Inscripcion, agenda_FechaMax_Cancelacion, agenda_Precio_Socio, agenda_Precio_Visible, asistente_CodPK} = evento;

    return (

        <FlexBox>
            <div className="block md:block 2xl:flex justify-start md:gap-8">
                <div className="w-full md:w-full 2xl:w-1/3 overflow-hidden">
                    <img src={`https://socios.excellencebusinessclub.com/archivos/agenda/${ agenda_Imagen }`} className="rounded  md:h-45 2xl:h-96  w-full object-cover" alt="" />
                </div>
                <div className='py-3'>

                    <Link href="../../agenda/eventos">
                        <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-3xl text-[#181c32] hover:text-gray-600 transition'>{ agenda_Titulo }</h3>
                    </Link>
                    <ul className="mt-5 text-sm">
                        <li className='flex items-center justify-start text-gray-400'>
                            <HiMiniCalendarDays className="mr-3" />  { cambiaf_a_formato_espanol(agenda_Fecha) } - { format(new Date(`1970-01-01T${agenda_Hora}Z`), 'HH:mm') }
                        </li>
                        <li className='flex items-center justify-start text-gray-400'>
                            <HiMiniMapPin className="mr-3" />  Lugar: { agenda_Lugar }
                        </li>
                        <li className='flex items-center justify-start text-gray-400'>
                            <HiMiniPencilSquare className="mr-3" />  Fecha Máx. Inscripción: { cambiaf_a_formato_espanol(agenda_FechaMax_Inscripcion) }
                        </li>
                        <li className='flex items-center justify-start text-gray-400'>
                            <HiMiniXMark className="mr-3" />   Fecha Máx. Cancelación: { cambiaf_a_formato_espanol(agenda_FechaMax_Cancelacion) }
                        </li>

                        {
                            agenda_Precio_Visible == "Si" &&
                                <li className='flex items-center justify-start text-gray-400'>
                                    <HiCurrencyEuro className="mr-3" />   Coste Catering: { formatoNumero(agenda_Precio_Socio) } €
                                </li>
                        }

                    </ul>

                    <div className="w-full pt-10">

                        <div className='flex justify-start'>
                            <Link href={`/agenda/${agenda_CodPK}`}>
                                <Button>
                                    VER MÁS
                                </Button>
                            </Link>
                            
                            { 
                                (!asistente_CodPK) 
                                ? 
                                    (new Date(agenda_FechaMax_Inscripcion) >= new Date()) &&
                                    <>
                                        <ButtonDefault onClick={openModal}>
                                            INSCRIBIRME
                                        </ButtonDefault>

                                        <ButtonDefault onClick={openModal_Sustituto}>
                                            INS. SUSTITUTO
                                        </ButtonDefault>
                                    </>
                                :
                                    (new Date(agenda_FechaMax_Cancelacion) >= new Date()) &&
                                        <ButtonDefault onClick={openModal_Anular}>
                                            ANULAR
                                        </ButtonDefault>
                            }
                        </div>

                    </div>
                </div>
            </div>

            {
                isModalOpen && 
                <Modal>
                    <ModalInscribirme onClose={closeModal} evento={evento} />
                </Modal>
            }

            {
                isModalOpen_Sustituto && 
                <Modal>
                    <ModalIns_Sustituto onClose={closeModal_Sustituto} evento={evento} />
                </Modal>
            }

            {
                isModalOpen_Anular && 
                <Modal>
                    <ModalAnularIns onClose={closeModal_Anular} evento={evento} />
                </Modal>
            }

        </FlexBox>
    )
}

export default FichaEvento