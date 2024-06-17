import { confirmAlert } from 'react-confirm-alert';
import { ModalConfirm } from '@/components';
import { bajaInvitado } from '../utils/api';

export const bajaEmpleado = (id, setRecarga) => {
    confirmAlert({
        customUI: ({ onClose }) => (
            <ModalConfirm
                onClose={onClose}
                onConfirm={() => bajaInvitado(id, setRecarga)}
                message="¿Estás seguro de querer dar de baja este invitado?"
            />
        )
    });
};
