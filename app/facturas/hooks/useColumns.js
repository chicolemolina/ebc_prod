
import { format } from 'date-fns';
import { HiDocumentArrowDown } from "react-icons/hi2";
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

export const useColumns = () => [
    {
        name: '#',
        selector: row => row && row.factura_CodPK,
        sortable: true,
        dbField: 'factura_CodPK',
        sortFunction: () => { },
    },
    {
        name: 'Nº FACTURA',
        selector: row => row && row.factura_Titulo,
        sortable: true,
        dbField: 'factura_Titulo',
        sortFunction: () => { },
    },
    {
        name: 'FECHA',
        selector: row => row && row.factura_Fecha,
        sortable: true,
        format: row => format(new Date(row.factura_Fecha), 'dd/MM/yyyy'),
        dbField: 'factura_Fecha',
        sortFunction: () => { },
    },
    {
        name: 'IMPORTE',
        selector: row => row && (row.factura_Importe + " €"),
        sortable: true,
        dbField: 'factura_Importe',
        sortFunction: () => { },
    },
    {
        name: 'ACCIONES',
        cell: row => (
            <>
                <Link
                    href={`https://socios.excellencebusinessclub.com/archivos/documentacion/${row.factura_Archivo}`}
                    target="_blank"
                    className="text-white bg-red-500 hover:bg-red-900 font-medium rounded-lg text-sm px-4 py-2.5"
                    rel="noopener noreferrer"
                    data-tooltip-id={`tooltipDoc-${row.factura_CodPK}`} data-tooltip-content="Descargar Documento"
                >
                    <HiDocumentArrowDown />
                </Link>
                <Tooltip id={`tooltipDoc-${row.factura_CodPK}`}  />
            </>
        ),
        button: "true",
    },
    
];
