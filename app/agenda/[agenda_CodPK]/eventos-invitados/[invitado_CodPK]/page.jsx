'use client'

import { FlexBox } from '@/app/components';
import InvitadoForm from "@/app/agenda/components/InvitadoForm";


export default function HomeInvitadosEvento({params}) {

    const HeadingSTyle = "mb-6 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"


    return (

        <div className="mx-[40px] mt-[100px] md:ml-[300px] pb-[100px]">

            <h1 className={HeadingSTyle}>Modificar invitado</h1>

            <div className="md:flex justify-start gap-4 ">

                <div className="grid md:grid-cols-1 m-auto mb-3">
                    <FlexBox>

                        <InvitadoForm params={params} />

                    </FlexBox>
                </div>
            </div>

        </div>

    );
}