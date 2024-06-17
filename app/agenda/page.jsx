'use client';

import { useAgenda } from './hooks/useAgenda';
import Link from 'next/link';
import ButtonTab from './components/ButtonsTab';
import FichaEvento from './components/FichaEvento';
import { HiMiniCalendarDays, HiMiniCalendar } from "react-icons/hi2";

export default function HomeAgenda() {

    const HeadingStyle = "mb-6 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl";
    const { agenda, error } = useAgenda();

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mx-[40px] mt-[100px] md:ml-[300px] pb-[100px]">

            <h1 className={HeadingStyle}>Agenda de eventos</h1>

            <div className="flex md:justify-start justify-between mb-3">
                <Link href="#">
                    <ButtonTab>
                        <HiMiniCalendarDays className="text-4xl m-auto mb-3" />
                        <span className='uppercase'>Próximos eventos</span>
                    </ButtonTab>
                </Link>

                <Link href="../agenda/eventos-pasados">
                    <ButtonTab>
                        <HiMiniCalendar className="text-4xl m-auto mb-3" />
                        <span className='uppercase'>Eventos pasados</span>
                    </ButtonTab>
                </Link>
            </div>

            <div className="md:flex md:w-full sm:w-full gap-4 mb-4 md:h-full mt-5">
                <div className="grid gap-5 md:grid-cols-2 mb-3">
                    {agenda.map((evento, index) => (
                        <FichaEvento key={index} evento={evento} />
                    ))}
                </div>
            </div>

        </div>
    );
}
