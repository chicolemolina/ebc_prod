
'use client';

import { usePromo } from '../hooks';
import { FlexBox } from '@/components';
import { format } from 'date-fns';

const DetallePromocion = ({ params }) => 
{
    const { partner_CodPK } = params;
    const { promo, loaded, error } = usePromo(partner_CodPK);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!loaded) {
        return <div>Loading...</div>;
    }

    return (
        <FlexBox>
            <div className="block mb-5">
                <h1 className="mb-4 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl">
                    {promo.partner_Titulo}
                </h1>
                <p className="text-black font-medium">
                    {promo.partner_Fecha && format(new Date(promo.partner_Fecha), 'dd/MM/yyyy')}
                </p>
            </div>
            <hr />
            <div className="block md:block 2xl:flex md:gap-8">
                <div className="w-full md:w-full 2xl:w-2/5 md:h-80 2xl:h-full overflow-hidden">
                    <img
                        src={`https://socios.excellencebusinessclub.com/archivos/partners/${promo.partner_Img_Principal}`}
                        className="rounded w-full object-cover"
                        alt=""
                    />
                </div>
                <div className='w-full md:w-full 2xl:w-3/5 py-3 md:mt-4 whitespace-pre-line'>
                    {promo.partner_Descripcion}
                </div>
            </div>
        </FlexBox>
    );

};

export default DetallePromocion;
