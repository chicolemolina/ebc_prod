
import { format } from 'date-fns';
import { HiDocumentArrowDown } from "react-icons/hi2";
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

export const useColumns = () => {
    return [
        {
            name: '#',
            selector: row => row && row.documentacion_CodPK,
            sortable: true,
            dbField: 'documentacion_CodPK',
            sortFunction: () => { },
        },
        {
            name: 'TÍTULO',
            selector: row => row && row.documentacion_Titulo,
            sortable: true,
            dbField: 'documentacion_Titulo',
            sortFunction: () => { },
        },
        {
            name: 'FECHA',
            selector: row => row && row.documentacion_Fecha,
            sortable: true,
            format: row => format(new Date(row.documentacion_Fecha), 'dd/MM/yyyy'),
            dbField: 'documentacion_Fecha',
            sortFunction: () => { },
        },
        {
            name: 'DESCRIPCIÓN',
            selector: row => row && row.documentacion_Descripcion,
            sortable: true,
            dbField: 'documentacion_Descripcion',
            sortFunction: () => { },
        },
        {
            name: 'CATEGORÍA',
            selector: row => row && row.catDoc_Nombre,
            sortable: true,
            dbField: 'catDoc_Nombre',
            sortFunction: () => { },
        },
        {
            name: 'ACCIONES',
            cell: row => (
                <>
                    <Link
                        href={`https://socios.excellencebusinessclub.com/archivos/documentacion/${row.documentacion_Archivo}`}
                        target="_blank"
                        className="text-white bg-red-500 hover:bg-red-900 font-medium rounded-lg text-sm px-4 py-2.5"
                        rel="noopener noreferrer"
                        data-tooltip-id={`tooltipDoc-${row.documentacion_CodPK}`} data-tooltip-content="Descargar Documento"
                    >
                        <HiDocumentArrowDown />
                    </Link>
                    <Tooltip id={`tooltipDoc-${row.documentacion_CodPK}`} />
                </>
            ),
            button: "true",
        },
    ];
};
