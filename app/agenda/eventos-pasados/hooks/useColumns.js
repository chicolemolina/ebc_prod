import { format } from 'date-fns';
import Link from 'next/link';
import { HiEye } from 'react-icons/hi2';
import { Tooltip } from 'react-tooltip';

export const useColumns = () => {
    const columns = [
        {
            name: 'IMAGEN',
            cell: row => (
                <>
                    <img src={`https://socios.excellencebusinessclub.com/archivos/agenda/${row.agenda_Imagen}`} className='my-2'></img>
                </>
            ),
            width: '10%',
        },
        {
            name: 'FECHA',
            selector: row => row && row.agenda_Fecha,
            sortable: true,
            format: row => format(new Date(row.agenda_Fecha), 'dd/MM/yyyy'),
            dbField: 'agenda_Fecha',
            sortFunction: () => { },
        },
        {
            name: 'TÍTULO',
            selector: row => row && row.agenda_Titulo,
            sortable: true,
            dbField: 'agenda_Titulo',
            sortFunction: () => { },
        },
        {
            name: 'ACCIONES',
            cell: row => (
                <>
                    <>
                        <Link
                            href={`/agenda/${row.agenda_CodPK}`}
                            className="group text-white bg-zinc-200 hover:bg-zinc-400 font-medium rounded-lg text-sm px-4 py-2.5 mr-1"
                            data-tooltip-id={`tooltipEye-${row.agenda_CodPK}`} 
                            data-tooltip-content={"Ver evento"}
                        >
                            <HiEye className="text-gray-500 group-hover:text-white"/>
                        </Link>
                        <Tooltip id={`tooltipEye-${row.agenda_CodPK}`}  />
                    </>
                    
                </>
            ),
            button: "true",
        },
    ];

    return columns;
};
