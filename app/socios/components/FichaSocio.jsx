import React from "react";
import FlexBox from "../../components/box";
import Link from 'next/link';
import Image from "next/image";
import {
    HiMiniDevicePhoneMobile,
    HiMiniEnvelope
} from "react-icons/hi2";
import { TiSocialInstagram } from "react-icons/ti";
import ReactHtmlParser from 'react-html-parser';

const DatosSocio = ({ children, className, socio }) => {
   
    const {socio_Foto, socio_Nombre, socio_Apellidos, socio_Telefono, socio_Email, socio_Perfil_Linkedin, socio_Perfil_Facebook, socio_Perfil_Instagram, socio_Descripcion} = socio;

    return (

        <div className="md:w-2/5 sm:w-full mb-4 md:h-full">

            <FlexBox>

                <div className="flex justify-start gap-6 pb-2 border-b-2 border-[#f4eeee]">

                    <div>
                        <Image
                            src={`http://01-servidor/react_back/archivos/socio_fotos/${socio_Foto}`}
                            width={120}
                            height={140}
                            alt="Nombre socio"
                            className="rounded-md mb-4 m-auto"
                        />
                    </div>
                    <div>

                        <h3 className="mb-2 tracking-normal">{socio_Nombre} {socio_Apellidos}</h3>

                        <ul className="font-medium tracking-normal my-2 text-sm">

                            <li className="mb-1 flex justify-start items-center">

                                <HiMiniDevicePhoneMobile className="h-5 w-5 text-[#d0a53d]" />
                                <Link href={`tel:0034${socio_Telefono}`} className="text-[#181c32] hover:text-[#d6d6d6] ml-2"><span className="">{socio_Telefono}</span></Link>

                            </li>
                            <li className="mb-1 flex justify-start items-center">

                                <HiMiniEnvelope className="h-5 w-5 text-[#d0a53d]" />
                                <Link href={`mailto:${socio_Email}`} className="text-[#181c32] hover:text-[#d6d6d6] ml-2"><span className="">{socio_Email}</span></Link>

                            </li>

                        </ul>
                        <div className="mb-1 flex  justify-start items-center">

                            {
                                (socio_Perfil_Linkedin != "") &&
                                (<Link href={`${socio_Perfil_Linkedin}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="#0077B5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d='M15 11.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457-.592 0-.945.398-1.1.784-.056.138-.071.33-.071.522v3.601H8.456s.029-5.842 0-6.447H10.6v.913l-.014.021h.014v-.02c.285-.44.793-1.066 1.932-1.066 1.41 0 2.468.922 2.468 2.902zM6.213 5.271C5.48 5.271 5 5.753 5 6.385c0 .62.466 1.115 1.185 1.115h.014c.748 0 1.213-.496 1.213-1.115-.014-.632-.465-1.114-1.199-1.114zm-1.086 9.556h2.144V8.38H5.127v6.447z' /><path d='M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z' />
                                    </svg>
                                </Link>)
                            }

                            {
                                (socio_Perfil_Facebook != "") &&
                                (<Link href={`${socio_Perfil_Facebook}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#1877F2"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
                                    </svg>
                                </Link>)
                            }

                            {
                                (socio_Perfil_Instagram != "") &&
                                (<Link href={`${socio_Perfil_Instagram}`}>
                                    <TiSocialInstagram className="h-5 w-5" />
                                </Link>)
                            }

                        </div>
                    </div>

                </div>

                <div className="flex flex-col mt-2">

                    <h3 className="my-3 tracking-normal font-semibold text-lg">Descripción personal</h3>

                    <p className="tracking-normal text-sm text-[#64748b] whitespace-pre-line">
                        {ReactHtmlParser(socio_Descripcion)}
                    </p>

                </div>

            </FlexBox>

        </div>
    )
}

export default DatosSocio






