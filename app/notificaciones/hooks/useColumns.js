
import { format } from 'date-fns';
import { HiEye, HiMiniTrash, HiEyeSlash } from "react-icons/hi2";
import { Tooltip } from 'react-tooltip';
import { Button } from '../../components/button';
import { cambioLeido } from '../utils/api';
import { confirmarMostrar } from '../utils/helpers';

export const useColumns = (setRecarga) => {
    return [
        {
            name: '#',
            selector: row => row && row.notificacion_CodPK,
            sortable: true,
            dbField: 'notificacion_CodPK',
            sortFunction: () => { }, // No realiza ninguna ordenación en el cliente
        },
        {
            name: 'FECHA',
            selector: row => row && row.notificacion_Fecha,
            sortable: true,
            format: row => format(new Date(row.notificacion_Fecha), 'dd/MM/yyyy'), // Formatea la fecha en formato dd/MM/yyyy
            dbField: 'notificacion_Fecha',
            sortFunction: () => { }, // No realiza ninguna ordenación en el cliente
        },
        {
            name: 'TÍTULO NOTIFICACIÓN',
            selector: row => row && row.notificacion_Asunto,
            sortable: true,
            dbField: 'notificacion_Asunto',
            sortFunction: () => { }, // No realiza ninguna ordenación en el cliente
        },
        {
            name: 'ESTADO',
            sortable: true,
            dbField: 'notificacion_Leido',
            cell: row => (
                <>
                    {row.notificacion_Leido === "Si" ? 
                        <span className="bg-green-100 p-1">Leída</span> : 
                        <span className="bg-yellow-100 p-1">No leída</span>
                    }
                </>
            ),
        },
        {
            name: 'ACCIONES',
            cell: row => (
                <>
                    <Button
                        className="group text-white bg-zinc-200 hover:bg-zinc-400 font-medium rounded-lg text-sm px-4 py-2.5 mr-1"
                        data-tooltip-id={`tooltipEye-${row.notificacion_CodPK}`} 
                        data-tooltip-content={row.notificacion_Leido === "Si" ? "Marcar como no leído" : "Marcar como leído"}
                        onClick={() => cambioLeido(row.notificacion_CodPK, row.notificacion_Leido, setRecarga)}
                    >
                        {row.notificacion_Leido === "Si" ? 
                            <HiEyeSlash className="text-gray-500 group-hover:text-white"/> : 
                            <HiEye className="text-gray-500 group-hover:text-white"/>
                        }
                    </Button>
                    <Tooltip id={`tooltipEye-${row.notificacion_CodPK}`} />

                    <Button
                        className="group text-white bg-zinc-200 hover:bg-zinc-400 font-medium rounded-lg text-sm px-4 py-2.5"
                        data-tooltip-id={`tooltipTrash-${row.notificacion_CodPK}`} data-tooltip-content="No Mostrar"
                        onClick={() => confirmarMostrar(row.notificacion_CodPK, setRecarga)}
                    >
                        <HiMiniTrash className="text-gray-500 group-hover:text-white"/>
                    </Button>
                    <Tooltip id={`tooltipTrash-${row.notificacion_CodPK}`} />
                </>
            ),
            button: "true",
        },
    ];
};
