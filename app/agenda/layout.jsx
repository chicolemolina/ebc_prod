'use client';

import Navbar from '../components/Navbar';
import SideBarNav from '../components/SidebarNav';
import Footer from '../components/footer';
import { useCheckAuthentication } from '../hooks';
import { RecargaProvider } from './context/RecargaProvider';

export default function AgendaLayout({ children }) {

    const valido = useCheckAuthentication();
    if (!valido)
        return null;

    return (
        <RecargaProvider>
            <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">

                <div className="flex">
                    <Navbar />
                    <SideBarNav />
                    <Footer />
                    {/* <ButtonPwa /> */}

                    <div className="w-full text-slate-900">
                        {children}
                    </div>

                </div>
            </div>
        </RecargaProvider>
    );
}