import DetallePromocion from '../../components/DetallePromocion';

export default function HomeDetallePromocion({params}) {

    const HeadingSTyle = "mb-6 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"


    return (

        <div className="mx-[40px] mt-[100px] md:ml-[300px] pb-[100px]">

            {/* <h1 className={HeadingSTyle}>Promociones</h1> */}

            <div className="md:flex md:w-full sm:w-full gap-4 mb-4 md:h-full mt-5">

                <div className="grid md:grid-cols-1 m-auto mb-3">

                    <DetallePromocion params={params}/>


                </div>

            </div>

        </div>

    );
}