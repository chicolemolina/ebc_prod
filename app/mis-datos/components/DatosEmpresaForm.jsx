
'use client';

import { FlexBox, ButtonIcon } from '@/components';
import { TiSocialLinkedin, TiSocialFacebook, TiSocialInstagram, TiImage } from "react-icons/ti";


export const MisDatosEmpresaForm = ({ children, className, formState, onInputChange }) => {
    const { socio_Emp_Nombre, socio_Emp_Logo, socio_Emp_Telefono, socio_Emp_Email, socio_Email_Facturacion, socio_Emp_Web, socio_Emp_Descripcion, socio_Emp_Perfil_Linkedin, socio_Emp_Perfil_Instagram, socio_Emp_Perfil_Facebook, socio_Emp_Archivo1_Nombre, socio_Emp_Archivo1, socio_Emp_Archivo2_Nombre, socio_Emp_Archivo2, socio_Emp_Archivo3_Nombre, socio_Emp_Archivo3} = formState;
 
    return (

        <div className="mb-4">

            <FlexBox>
                <div className="border-b-2 border-neutral-100 py-3 dark:border-white/10 mb-8">
                    <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-2xl text-slate-500'>Datos de la empresa</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-1 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Nombre"
                        type="text"
                        name="socio_Emp_Nombre"
                        value={socio_Emp_Nombre} 
                        onChange={onInputChange}
                        placeholder="Nombre de la empresa"
                        
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-6">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Logo"
                        type="file"
                        onChange={onInputChange}
                        name="socio_Emp_Logo"
                    />

                    {
                        socio_Emp_Logo && (
                            <a
                                href={`http://01-servidor/react_back/archivos/socio_fotos/${socio_Emp_Logo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonIcon>
                                    <TiImage />
                                </ButtonIcon>
                            </a>
                        )
                    }

                    <small className='text-gray-400 tracking-normal text-xs'>Logo de la empresa (tamaño: 150x150px)</small>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Telefono"
                        type="text"
                        name="socio_Emp_Telefono"
                        value={socio_Emp_Telefono} 
                        onChange={onInputChange}
                        placeholder="Teléfono de la empresa"
                        
                    />
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Email"
                        type="email"
                        name="socio_Emp_Email"
                        value={socio_Emp_Email} 
                        onChange={onInputChange}
                        placeholder="Email de la empresa"
                        
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 mb-3">

                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Email_Facturacion"
                        type="email"
                        name="socio_Email_Facturacion"
                        value={socio_Email_Facturacion} 
                        onChange={onInputChange}
                        placeholder="Email de facturación"
                        
                    />
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Web"
                        type="text"
                        name="socio_Emp_Web"
                        value={socio_Emp_Web} 
                        onChange={onInputChange}
                        placeholder="Web de la empresa"
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-1 ">

                    <textarea
                        className='w-full rounded-md min-h-24 py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100'
                        id="socio_Emp_Descripcion"
                        name="socio_Emp_Descripcion"
                        value={socio_Emp_Descripcion} 
                        onChange={onInputChange}
                        placeholder="Descripción"
                    >

                    </textarea>
                </div>

                <div className="border-b-2 border-neutral-100 py-3 dark:border-white/10 mt-5 mb-5">
                    <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-2xl text-slate-500'>Redes sociales de la empresa</h3>
                </div>

                <div className="relative grid gap-4 md:grid-cols-1 mb-2">
                    <div className="absolute top-2/4 left-0 grid text-2xl h-10 w-10 -translate-y-2/4 place-items-center ">
                        <TiSocialLinkedin />
                    </div>
                    <input
                        className="w-full rounded-md py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Perfil_Linkedin"
                        type="text"
                        name="socio_Emp_Perfil_Linkedin"
                        value={socio_Emp_Perfil_Linkedin} 
                        onChange={onInputChange}
                    />
                </div>

                <div className="relative grid gap-4 md:grid-cols-1 mb-2">
                    <div className="absolute top-2/4 left-0 grid text-2xl h-10 w-10 -translate-y-2/4 place-items-center ">
                        <TiSocialInstagram />
                    </div>
                    <input
                        className="w-full rounded-md py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Perfil_Instagram"
                        type="text"
                        name="socio_Emp_Perfil_Instagram"
                        value={socio_Emp_Perfil_Instagram} 
                        onChange={onInputChange}
                    />
                </div>
                <div className="relative grid gap-4 md:grid-cols-1 mb-2">
                    <div className="absolute top-2/4 left-0 grid text-2xl h-10 w-10 -translate-y-2/4 place-items-center ">
                        <TiSocialFacebook />
                    </div>
                    <input
                        className="w-full rounded-md py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Perfil_Facebook"
                        type="text"
                        name="socio_Emp_Perfil_Facebook"
                        value={socio_Emp_Perfil_Facebook} 
                        onChange={onInputChange}
                    />
                </div>

                <div className="border-b-2 border-neutral-100 py-3 dark:border-white/10 mt-5 mb-5">
                    <h3 className='text-xl font-semibold tracking-normal md:text-base lg:text-2xl text-slate-500'>Archivos</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-3 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Archivo1_Nombre"
                        type="text"
                        name="socio_Emp_Archivo1_Nombre"
                        placeholder='Nombre archivo'
                        value={socio_Emp_Archivo1_Nombre} 
                        onChange={onInputChange}
                        
                    />
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Archivo1"
                        type="file"
                        name="socio_Emp_Archivo1"
                        onChange={onInputChange}
                    />

                    {
                        socio_Emp_Archivo1 && (
                            <a
                                href={`http://01-servidor/react_back/archivos/socio_fotos/${socio_Emp_Archivo1}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonIcon>
                                    <TiImage />
                                </ButtonIcon>
                            </a>
                        )
                    }

                    <small className='text-gray-400 tracking-normal text-xs'>Foto Socio (tamaño: 150x150px)</small>
                </div>
                <div className="grid gap-4 md:grid-cols-3 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Archivo2_Nombre"
                        type="text"
                        name="socio_Emp_Archivo2_Nombre"
                        placeholder='Nombre archivo'
                        value={socio_Emp_Archivo2_Nombre} 
                        onChange={onInputChange}
                    />
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Archivo2"
                        type="file"
                        name="socio_Emp_Archivo2"
                        onChange={onInputChange}
                    />
                    
                    {
                        socio_Emp_Archivo2 && (
                            <a
                                href={`http://01-servidor/react_back/archivos/socio_fotos/${socio_Emp_Archivo2}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonIcon>
                                    <TiImage />
                                </ButtonIcon>
                            </a>
                        )
                    }

                    <small className='text-gray-400 tracking-normal text-xs'>Foto Socio (tamaño: 150x150px)</small>
                </div>

                <div className="grid gap-4 md:grid-cols-3 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Archivo3_Nombre"
                        type="text"
                        name="socio_Emp_Archivo3_Nombre"
                        placeholder='Nombre archivo'
                        value={socio_Emp_Archivo3_Nombre} 
                        onChange={onInputChange}
                        
                    />
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Emp_Archivo3"
                        type="file"
                        name="socio_Emp_Archivo3"
                        onChange={onInputChange}
                    />
                    
                    {
                        socio_Emp_Archivo3 && (
                            <a
                                href={`http://01-servidor/react_back/archivos/socio_fotos/${socio_Emp_Archivo3}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonIcon>
                                    <TiImage />
                                </ButtonIcon>
                            </a>
                        )
                    }

                    <small className='text-gray-400 tracking-normal text-xs'>Foto Socio (tamaño: 150x150px)</small>
                </div>
            </FlexBox>
        </div>
    )
}



