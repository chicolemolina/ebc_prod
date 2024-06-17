
import { format } from 'date-fns';
import { HiEye } from "react-icons/hi2";
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

export const useColumns = () => {
    return [
        {
            name: '#',
            selector: row => row && row.partner_CodPK,
            sortable: true,
            dbField: 'partner_CodPK',
            sortFunction: () => {}, // No realiza ninguna ordenación en el cliente
        },
        {
            name: 'FECHA',
            selector: row => row && row.partner_Fecha,
            sortable: true,
            format: row => format(new Date(row.partner_Fecha), 'dd/MM/yyyy'), // Formatea la fecha en formato dd/MM/yyyy
            dbField: 'partner_Fecha',
            sortFunction: () => {}, // No realiza ninguna ordenación en el cliente
        },
        {
            name: 'SOCIO PROPIETARIO',
            selector: row => row && (row.socio_Nombre + " " + row.socio_Apellidos),
            sortable: true,
            dbField: 'socio_Nombre',
            sortFunction: () => {}, // No realiza ninguna ordenación en el cliente
        },
        {
            name: 'PROMOCIONES',
            selector: row => row && row.partner_Titulo,
            sortable: true,
            dbField: 'partner_Titulo',
            sortFunction: () => {}, // No realiza ninguna ordenación en el cliente
        },
        {
            name: 'ACCIONES',
            cell: row => (
                <>
                    <Link
                        href={`/promociones/detalle/${row.partner_CodPK}`}
                        className="group text-white bg-zinc-200 hover:bg-zinc-400 font-medium rounded-lg text-sm px-4 py-2.5 mr-1"
                        data-tooltip-id={`tooltipEye-${row.partner_CodPK}`} 
                        data-tooltip-content={"Ver detalle"}
                    >
                        <HiEye className="text-gray-500 group-hover:text-white"/>
                    </Link>
                    <Tooltip id={`tooltipEye-${row.partner_CodPK}`} />
                </>
            ),
            button: true,
        },
    ];
};
