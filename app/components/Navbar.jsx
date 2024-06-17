
'use client'

import { useEffect, useState } from "react";
import Link from 'next/link';
import { logoutUser } from '../hooks';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { BackButton } from "./BackButton";
import {

    HiMiniUserGroup,
    HiClipboardDocumentList,
    HiMiniCalendarDays,
    HiMiniBell,
    HiMiniUser,
    HiMiniXMark,
    HiMiniBars3,
    HiDocumentText,
    HiMiniBriefcase,
    HiMiniCursorArrowRays,
    HiMiniPencil,
    HiMiniCubeTransparent,
    HiMiniNewspaper,
    HiMiniArrowRightOnRectangle
} from "react-icons/hi2";


export function Navbar() {
    const router = useRouter();

    // state . nombre del slice . nombre del state (variable)
    const ebc_userData = useSelector(state => state.user.userData);

    const btnLink = "flex items-center text-1xl uppercase tracking-widest"
    const LiOnclick = "py-3 text-[#d0d4e9] hover-text-[#fff] cursor-pointer flex border-b-[1px] border-[#737b89]"
    const LinKDropdown = "text-sm text-[#3f4254] hover:text-[#a1a5b7] font-semibold py-2 flex"
    const Headercss = "bg-[#ffffff] border-b-[1px] border-[#181c32] text-[#181c32] w-full ease-in duration-200 fixed top-0 left-0 z-10"
    const Navcss = "max-w-[1366] mx-auto flex justify-between items-center p-4 pt-2 pb-2"

    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [menuIcon, setIcon] = useState(false);

    const handleSmallerScreensNavigation = () => {
        setIcon(!menuIcon);
    }

    const onLogout = async () => {
        const response = await logoutUser();

        router.push('/login'); 
    }

    useEffect(() => {
        
    }, [ebc_userData])
    

    return (
        <header className={Headercss}>
            <nav className={Navcss}>

                <div>
                    <Link href="/">

                        <img src={'https://socios.excellencebusinessclub.com/assets/media/logo.jpg'} alt="Logo EBC" />

                    </Link>
                </div>

                {/*Large Screen Navigation*/}
                <ul className="hidden md:flex items-center ">

                    <li className="mx-2 hidden md:flex">
                        <Link href="/notificaciones" className="text-[#d6d6d6] hover:text-[#181c32]"><HiMiniBell className="h-6 w-6" /><span className="hidden">Notificaciones</span></Link>

                    </li>
                    <li className="mx-2 hidden md:flex">
                        <Link href="/agenda" className="text-[#d6d6d6] hover:text-[#181c32]"><HiMiniCalendarDays className="h-6 w-6" /><span className="hidden">Agenda</span></Link>

                    </li>
                    <li className="mx-2">
                        <Link href="" onClick={() => setdropdownOpen(!dropdownOpen)} className="text-[#d6d6d6] hover:text-[#181c32]"><HiMiniUser className="h-6 w-6" /><span className="hidden">Mi cuenta</span></Link>
                        <div className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute right-10 z-40 mt-[-10px] w-[275px] rounded-lg shadow-lg border-light bg-white p-5 transition-all`}>

                            <div className="font-semibold text-sm">{ebc_userData.socio_Nombre}</div>
                            <div className="font-normal text-sm">{ebc_userData.socio_Email}</div>
                            <div className="border-b-2 border-neutral-100 py-1 dark:border-white/10"></div>
                            <ul className="mt-2">

                                <li><Link href="/mis-datos" className={LinKDropdown}><HiMiniPencil className="mr-3 " />Mis datos</Link></li>
                                <li><button href="/" onClick={onLogout} className={LinKDropdown}><HiMiniArrowRightOnRectangle className="mr-2 " /> Cerrar sesión</button></li>

                            </ul>

                        </div>

                    </li>

                    <li>
                          <BackButton />
                    </li>

                </ul>

                <div onClick={handleSmallerScreensNavigation} className="flex md:hidden">

                    {menuIcon ?

                        (<HiMiniXMark size={25} className="text-[#181c32]" />)
                        :
                        (<HiMiniBars3 size={25} className="text-[#181c32]" />)
                    }
                </div>

                <div className={menuIcon ?

                    'md:hidden absolute top-[75px] right-0 bottom-0 left-0 justify-center items-center w-full h-screen bg-slate-800 text-white ease-in duration-200'
                    :

                    'md:hidden absolute top-[75px] right-0 left-[-100%] justify-center items-center w-full h-screen bg-slate-800 text-white text-center ease-in duration-200'

                }>

                    {/*Smaller Screen Navigation*/}

                    <div className="w-full px-10 py-5">

                        <div className="py-3">
                            <h3 className="text-gray-300 font-weight-bold text-xl">Jose Molina Nubeado</h3>
                            <span className="text-white text-base">creativo@nubeado.com</span>
                        </div>

                        <ul className="font-medium">

                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/socios" className={btnLink}><HiMiniUserGroup className="mr-4 text-xl " /> Socios</Link>

                            </li>

                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/facturas" className={btnLink}><HiClipboardDocumentList className="mr-4 text-xl " /> Facturas</Link>

                            </li>

                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/documentacion" className={btnLink}><HiDocumentText className="mr-4 text-xl " /> Documentación</Link>

                            </li>

                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/mis-ofertas" className={btnLink}><HiMiniBriefcase className="mr-4 text-xl " /> Empleo</Link>

                            </li>


                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/notificaciones" className={btnLink}><HiMiniBell className="mr-4 text-xl " /> Notificaciones</Link>

                            </li>

                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/promociones" className={btnLink}><HiMiniCursorArrowRays className="mr-4 text-xl " /> Promociones</Link>

                            </li>

                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/Agenda" className={btnLink}><HiMiniCalendarDays className="mr-4 text-xl " /> Agenda</Link>

                            </li>

                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/mis-datos" className={btnLink}><HiMiniPencil className="mr-4 text-xl " />  Mis datos</Link>

                            </li>
                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/mis-productos" className={btnLink}><HiMiniCubeTransparent className="mr-4 text-xl " /> Mis productos</Link>

                            </li>
                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <Link href="/mis-ofertas" className={btnLink}><HiMiniNewspaper className="mr-4 text-xl " /> Mis empleos</Link>

                            </li>
                            <li onClick={handleSmallerScreensNavigation} className={LiOnclick}>

                                <button onClick={onLogout} className={btnLink}><HiMiniArrowRightOnRectangle className="mr-2 " /> Cerrar sesión</button>

                            </li>

                        </ul>


                    </div>

                </div>
            </nav>
            

        </header>
    );
}