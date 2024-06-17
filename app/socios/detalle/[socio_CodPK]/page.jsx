'use client'

import { DetalleSocio } from '@/app/socios/components'

export default function HomeDetalleSocio({ params }) {
   
    const HeadingSTyle = "mb-6 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"
    const GridStyle = "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"

    return (
        
        <div className="mx-[40px] mt-[100px] md:ml-[300px]">

            <h1 className={HeadingSTyle}>Socios</h1>

            <div className={GridStyle}>

                <DetalleSocio params={params}/>

            </div>

        </div>

    );
}



