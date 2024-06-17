'use client'

import { useEffect, useState } from "react";
import { FlexBox, LinkSimple } from '@/app/components';
import Link from 'next/link';
import { HiMiniUserGroup,
        HiMiniBriefcase, 
        HiMiniCalendarDays,
        HiMiniIdentification   
        } from "react-icons/hi2";
import axios from "axios";

export default function Home() {
    const HeadingSTyle = "mb-4 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"
    const GridStyle = "w-100 md:w-1/2 mb-4"


    const [sociosTotales, setSociosTotales] = useState(0);
    const [ofertasTotales, setOfertasTotales] = useState(0);
    const [eventosTotales, setEventosTotales] = useState(0);
    const [promocionesTotales, setPromocionesTotales] = useState(0);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
   
        if (!loaded) {
            const token = sessionStorage.getItem('ebc_token'); // Obtener el token almacenado en sessionStorage (o donde lo almacenes)
            const ebc_userData = JSON.parse(sessionStorage.getItem('ebc_userData'));

            const requestOptions = {
                method: 'post', // Especificar el método POST
                headers: {
                    'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    action: "get-datosDashboard",
                    socio_CodPK: ebc_userData.socio_CodPK
                } // Datos a enviar en el cuerpo de la solicitud
            };

            axios("/api", requestOptions)
                .then((response) => {
                    // console.log(response);

                    if (response.data.success) {
                        setLoaded(true);
                        setSociosTotales(response.data.total_socios_inscritos);
                        setOfertasTotales(response.data.total_ofertas);
                        setEventosTotales(response.data.total_agenda);
                        setPromocionesTotales(response.data.total_promociones);
                    } else {
                        setError(response.data.errorMessage);
                        console.log(error);
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }, [loaded]);

    return (
        <>

            <div className="mx-[40px] mt-[100px] md:ml-[300px]">

                <h1 className={HeadingSTyle}>Escritorio</h1>

                <div className="md:flex gap-6 mt-[40px]">

                    <div className={GridStyle}>

                        <FlexBox>

                            <HiMiniUserGroup className="h-10 w-10 text-[#d0a53d] mb-5" />

                            <h2 className="text-3xl font-semibold tracking-normal"><span>{sociosTotales}</span> Socios pertenencen a EBC</h2>

                            <LinkSimple>

                                <Link href="/socios" >Ver socios</Link>

                            </LinkSimple>

                        </FlexBox>

                    </div>

                    <div className={GridStyle}>

                        <FlexBox>

                            <HiMiniBriefcase className="h-10 w-10 text-[#d0a53d] mb-5" />

                            <h2 className="text-3xl font-semibold tracking-normal"><span>{ofertasTotales}</span> Ofertas de empleo</h2>

                            <LinkSimple>

                                <Link href="/mis-ofertas" >Ver empleos</Link>

                            </LinkSimple>

                        </FlexBox>

                    </div>

                </div>

                <div className="md:flex mb-4 gap-6">

                    <div className={GridStyle}>

                        <FlexBox>

                            <HiMiniCalendarDays className="h-10 w-10 text-[#d0a53d] mb-5" />

                            <h2 className="text-3xl font-semibold tracking-normal"><span>{eventosTotales}</span> próximo(s) evento(s)</h2>

                            <LinkSimple>

                                <Link href="/agenda" >Ver eventos</Link>

                            </LinkSimple>

                        </FlexBox>

                    </div>

                    <div className={GridStyle}>

                        <FlexBox>

                            <HiMiniIdentification className="h-10 w-10 text-[#d0a53d] mb-5" />

                            <h2 className="text-3xl font-semibold tracking-normal"><span>{promocionesTotales}</span> Promociones</h2>

                            <LinkSimple>

                                <Link href="/promociones" >Ver promociones</Link>

                            </LinkSimple>

                        </FlexBox>

                    </div>

                </div>

            </div>
        </>
    );
}
