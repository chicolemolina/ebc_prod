'use client'

import React, { useEffect, useState } from 'react'
import { DatosSocio, DatosEmpresa } from '@/app/socios/components'
import { getSocio } from '@/utils';


export const DetalleSocio = ({ children, className, params }) => {

    // const searchParams = useSearchParams();
    // const socio_CodPK = searchParams.get('socio_CodPK');

    const { socio_CodPK } = params;

    const [socio, setSocio] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        if (!loaded)
            getSocio(socio_CodPK, setLoaded, setSocio);

    }, [loaded]);


    useEffect(() => {
        if (loaded && socio) {
            document.title = `${socio.socio_Nombre} ${socio.socio_Apellidos}`; // Ajusta según la estructura de los datos
        }
    }, [loaded, socio]);

    return (

        <div className="md:flex gap-4 mb-[100px]">

            {
                Object.keys(socio).length > 0 && (
                    <>
                        <DatosSocio socio={socio} />
                        <DatosEmpresa socio={socio} />
                    </>
                )
            }
            
        </div>

    )
}




