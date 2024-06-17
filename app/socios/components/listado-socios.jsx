"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FlexBox from '../../components/box';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function listadoSocios() {
    const router = useRouter();

    const [socios, setSocios] = useState([]);
    const [loaded, setLoaded] = useState(false);

	useEffect(() => {

        if (!loaded) {
           
            const requestOptions = {
                method: 'post', // Especificar el método POST
                headers: {
                    'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
                    'Access-Control-Allow-Origin': '*'
                },
                data: {
                    action: "get-socios"
                } // Datos a enviar en el cuerpo de la solicitud
            };

            axios("/api", requestOptions)
            .then((response) => {
                // console.log(response);
                
                if (response.data.success) 
                {
                    setLoaded(true);
                    setSocios(response.data.socioData);
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

        socios.map((socio, index) => (
            // <tr key={index}>
            //     <td>{user.first_name}</td>
            //     <td>{user.last_name}</td>
            //     <td>{user.email}</td>
            //     <td>
            //         <Link to={`/edit/${user.id}`} className="btn btn-warning btn-sm">Edit</Link>&nbsp;
            //         <button type="button" onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
            //     </td>
            // </tr>
            

            <div key={index}>

                <FlexBox >
                    <div className="mb-4">
                        <Link href={`/socios/detalle?socio_CodPK=${socio.socio_CodPK}`} className="text-center">
                            <div className="relative w-40 h-40 lg:w-40 lg:h-40 bg-gray-200">
                                <img src={`http://01-servidor/react_back/archivos/socio_fotos/${socio.socio_Foto}`} alt="image" className="w-full h-full object-cover"></img>
                            </div>
                        </Link>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <Link href={`/socios/detalle?socio_CodPK=${socio.socio_CodPK}`} className="text-gray-900 hover:text-primary text-lg font-bold mr-1">{socio.socio_Nombre} {socio.socio_Apellidos}</Link>
                        </div>
                        <div className="font-semibold text-sm mb-4 pr-2">
                            <Link href={`/socios/detalle?socio_CodPK=${socio.socio_CodPK}`} className="text-gray-600 hover:text-primary mr-5 mb-2">
                                {socio.socio_Emp_Nombre}
                            </Link>
                        </div>
                    </div>

                </FlexBox>
            </div>
         ))

  )
}
