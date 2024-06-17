
'use client';

import ButtonIcon from '../../components/ButtonsIcon';
import Flexbox from '../../components/box';
import { TiSocialLinkedin, TiSocialFacebook, TiSocialInstagram, TiImage } from "react-icons/ti";

export const MisDatosForm = ({ children, className, formState, onInputChange }) => {
    const { socio_Nombre, socio_Apellidos, socio_Telefono, socio_Email, socio_Pass, socio_Descripcion, socio_Perfil_Linkedin, socio_Perfil_Instagram, socio_Perfil_Facebook, socio_Foto, socio_Alergia} = formState;
  
    return (

        <div className="mb-4">

            <Flexbox>
                <div className="border-b-2 border-neutral-100 py-3 dark:border-white/10 mb-8">
                    <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-2xl text-slate-500'>Datos personales</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Nombre"
                        type="text"
                        name="socio_Nombre"
                        value={socio_Nombre} 
                        onChange={onInputChange}
                        placeholder="Nombre"
                        
                    />
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Apellidos"
                        type="text"
                        name="socio_Apellidos"
                        value={socio_Apellidos} 
                        onChange={onInputChange}
                        placeholder="Apellidos"
                        
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Telefono"
                        type="text"
                        name="socio_Telefono"
                        value={socio_Telefono} 
                        onChange={onInputChange}
                        placeholder="Teléfono"
                        
                    />
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Email"
                        type="email"
                        name="socio_Email"
                        value={socio_Email} 
                        onChange={onInputChange}
                        placeholder="Email"
                        
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-1 mb-3">

                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Pass"
                        type="password"
                        name="socio_Pass"
                        value={socio_Pass} 
                        onChange={onInputChange}
                        placeholder="Contraseña"
                        
                        minLength={6}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-1 ">

                    <textarea
                        className='w-full rounded-md min-h-24 py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100'
                        id="socio_Descripcion"
                        name="socio_Descripcion"
                        value={socio_Descripcion}
                        onChange={onInputChange}
                        placeholder="Descripción"
                    >

                    </textarea>
                </div>

                <div className="border-b-2 border-neutral-100 py-3 dark:border-white/10 mt-5 mb-5">
                    <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-2xl text-slate-500'>Redes sociales</h3>
                </div>

                <div className="relative grid gap-4 md:grid-cols-1 mb-2">
                    <div className="absolute top-2/4 left-0 grid text-2xl h-10 w-10 -translate-y-2/4 place-items-center ">
                        <TiSocialLinkedin />
                    </div>
                    <input
                        className="w-full rounded-md py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Perfil_Linkedin"
                        type="text"
                        name="socio_Perfil_Linkedin"
                        value={socio_Perfil_Linkedin} 
                        onChange={onInputChange}
                        
                    />
                </div>

                <div className="relative grid gap-4 md:grid-cols-1 mb-2">
                    <div className="absolute top-2/4 left-0 grid text-2xl h-10 w-10 -translate-y-2/4 place-items-center ">
                        <TiSocialInstagram />
                    </div>
                    <input
                        className="w-full rounded-md py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Perfil_Instagram"
                        type="text"
                        name="socio_Perfil_Instagram"
                        value={socio_Perfil_Instagram} 
                        onChange={onInputChange}
                        
                    />
                </div>
                <div className="relative grid gap-4 md:grid-cols-1 mb-2">
                    <div className="absolute top-2/4 left-0 grid text-2xl h-10 w-10 -translate-y-2/4 place-items-center ">
                        <TiSocialFacebook />
                    </div>
                    <input
                        className="w-full rounded-md py-[12px] pl-10 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Perfil_Facebook"
                        type="text"
                        name="socio_Perfil_Facebook"
                        value={socio_Perfil_Facebook} 
                        onChange={onInputChange}
                        
                    />
                </div>

                <div className="border-b-2 border-neutral-100 py-3 dark:border-white/10 mt-5 mb-5">
                    <h3 className='text-xl font-semibold tracking-normal md:text-base lg:text-2xl text-slate-500'>Imagen socio</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Foto"
                        type="file"
                        name="socio_Foto"
                        onChange={onInputChange}
                    />

                    {
                        socio_Foto && (
                            <a
                                href={`http://01-servidor/react_back/archivos/socio_fotos/${socio_Foto}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonIcon>
                                    <TiImage />
                                </ButtonIcon>
                            </a>
                        )
                    }

                </div>

                <div className="grid gap-4 md:grid-cols-1 mb-3">
                    <small className="text-gray-400 tracking-normal text-xs">Foto Socio (tamaño: 150x150px)</small>
                </div>

                <div className="border-b-2 border-neutral-100 py-3 dark:border-white/10 mt-5 mb-5">
                    <h3 className='text-2xl font-semibold tracking-normal md:text-base lg:text-2xl text-slate-500'>Alergia/intolerancia</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-1 mb-3">
                    <input
                        className="w-full rounded-md py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-400 bg-slate-50 active:bg-slate-100 focus:border-none focus:outline-none focus:ring focus:ring-slate-100"
                        id="socio_Alergia"
                        type="text"
                        name="socio_Alergia"
                        value={socio_Alergia} 
                        onChange={onInputChange}
                        placeholder="Alergia/Intolerancia"
                    />
                </div>

            </Flexbox>
        </div>
    )
}




