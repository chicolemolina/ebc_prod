import { FlexBox, ModalSustituto, Modal } from '@/app/components';
import Link from 'next/link';
import Image from "next/image"
import { useState } from "react";


const CajaSocio = ({socio}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const {socio_CodPK, socio_Nombre, socio_Apellidos, socio_Emp_Nombre, asistente_Sustituto, asistente_Sustituto_Nombre} = socio;

    let socio_Nombre_Completo = (asistente_Sustituto === "Si") ? asistente_Sustituto_Nombre : `${socio_Nombre} ${socio_Apellidos}`;
    let socio_Foto = (asistente_Sustituto === "Si") ? "socio_representante.jpg" : socio.socio_Foto;


    // let link_socio = `/socios/detalle?socio_CodPK=${socio_CodPK}`;
    let link_socio = `/socios/detalle/${socio_CodPK}`;
    let imageComponent = (
        <Image
            src={`http://01-servidor/react_back/archivos/socio_fotos/${socio_Foto}`}
            width={160}
            height={160}
            alt="Nombre socio"
            className="rounded-md mb-4 m-auto"
        />
    );

    return (
        <FlexBox className="text-center w-100">
            {asistente_Sustituto === "No" || !asistente_Sustituto ? (
                <Link href={link_socio}>{imageComponent}</Link>
            ) : (
                <button onClick={openModal}>{imageComponent}</button>
            )}

            <h3 className="text-1xl font-semibold tracking-normal">
                <Link href={link_socio} className="hover:text-[#d0a53d] ease duration-100">{socio_Nombre_Completo}</Link>
            </h3>

            <Link href={link_socio} className="text-[#d0a53d]">{socio_Emp_Nombre}</Link>
            
            {isModalOpen && (
                <Modal>
                    <ModalSustituto onClose={closeModal} socio={socio} />
                </Modal>
            )}
            
        </FlexBox>
    );
}

export default CajaSocio;
