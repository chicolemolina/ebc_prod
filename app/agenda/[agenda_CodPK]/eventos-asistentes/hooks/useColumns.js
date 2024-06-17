
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { Button } from '@/app/components';
import { bajaEmpleado } from '../utils/helpers';


export const useColumns = (ebc_userData, setRecarga) => [
    {
        name: 'NOMBRE',
        selector: row => row && row.invitado_Nombre,
        sortable: true,
        dbField: 'invitado_Nombre',
        sortFunction: () => { }, // No realiza ninguna ordenación en el cliente
    },
    {
        name: 'EMPRESA',
        selector: row => row && row.invitado_Empresa,
        sortable: true,
        dbField: 'invitado_Empresa',
        sortFunction: () => { }, // No realiza ninguna ordenación en el cliente
    },
    {
        name: 'ACTIVIDAD',
        selector: row => row && row.invitado_Actividad,
        sortable: true,
        dbField: 'invitado_Actividad',
        sortFunction: () => { }, // No realiza ninguna ordenación en el cliente
    },
    {
        name: 'INVITADO POR',
        selector: row => row && (row.socio_Nombre && row.socio_Apellidos ? row.socio_Nombre + " " + row.socio_Apellidos : "EBC"),
        sortable: true,
        dbField: 'socio_Nombre',
        sortFunction: () => { }, // No realiza ninguna ordenación en el cliente
    },
    {
        name: 'ACCIONES',
        cell: row => {
            const muestraAccion = (
                ebc_userData.socio_CodPK === row.invitado_SocioFK &&
                new Date(row.agenda_FechaMax_Inscripcion) >= new Date() &&
                new Date(row.agenda_Fecha) >= new Date() &&
                row.invitado_Pagado === "No"
            );
            
            if (muestraAccion) 
            {
                return (
                    <>
                        <Link href={`/agenda/${row.invitado_AgendaFK}/eventos-invitados/${row.invitado_CodPK}`}>
                            <Button
                                className="group text-white bg-zinc-200 hover:bg-zinc-400 font-medium rounded-lg text-sm px-4 py-2.5 mr-1"
                                data-tooltip-id={`tooltipEye-${row.invitado_CodPK}`} 
                                data-tooltip-content="Modificar invitado"
                            >
                                <HiMiniPencilSquare className="text-gray-500 group-hover:text-white" />
                            </Button>
                        </Link>
                        <Tooltip id={`tooltipEye-${row.invitado_CodPK}`} />
    
                        <Button
                            className="group text-white bg-zinc-200 hover:bg-zinc-400 font-medium rounded-lg text-sm px-4 py-2.5"
                            data-tooltip-id={`tooltipTrash-${row.invitado_CodPK}`} 
                            data-tooltip-content="Eliminar"
                            onClick={() => bajaEmpleado(row.invitado_CodPK, setRecarga)}
                        >
                            <HiMiniTrash className="text-gray-500 group-hover:text-white" />
                        </Button>
                        <Tooltip id={`tooltipTrash-${row.invitado_CodPK}`} />
                    </>
                );
            }
    
            return null;
        },
        // cell: row => <button onClick={() => handleButtonClick(row)}>Ver</button>,
        button: "true",
    },
    
];
