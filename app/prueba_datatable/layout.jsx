'use client';

import { Navbar, SideBarNav, Footer } from '@/app/components';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function FacturasLayout({ children }) {

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("ebc_loggedIn");

        if (!loggedIn) {
            router.push('/login');
        }
        else {
            setIsLoggedIn(true);
        }

    }, [router]);

    // Si el usuario no está autenticado, no se renderiza el resto de la página
    if (!isLoggedIn) {
        return null; // O un componente de carga o un mensaje de espera
    }

    return (
        <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">

            <div className="flex">
                <Navbar/>
                <SideBarNav />
                <Footer />
                {/* <ButtonPwa /> */}

                <div className="w-full text-slate-900">
                    {children}
                </div>

            </div>
        </div>
    );
}