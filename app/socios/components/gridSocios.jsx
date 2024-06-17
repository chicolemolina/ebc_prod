"use client"

import { useEffect, useState } from 'react'
import { CajaSocio } from '@/app/socios/components'
import { getSocios } from "@/utils";


export const GridSocios = () => {

    const GridStyle="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-center";

    
    const [socios, setSocios] = useState([]);
    const [loaded, setLoaded] = useState(false);

	useEffect(() => {

        if (!loaded) 
            getSocios(setLoaded, setSocios);

	}, [loaded]);


    return (
        <div className={GridStyle}>

            {
                socios.map((socio, index) => (
                    <CajaSocio 
                        key={index} 
                        // {...socio} 
                        socio={socio}
                    />
                ))
            }


        </div>

    )
}

