
import { confirmAlert } from 'react-confirm-alert';
import { ModalConfirm } from '@/components';
import { cambioMostrar } from '../utils/api';

export const confirmarMostrar = (id, setRecarga) => {
    confirmAlert({
        customUI: ({ onClose }) => (
            <ModalConfirm
                onClose={onClose}
                onConfirm={() => cambioMostrar(id, setRecarga)}
                message="¿Estás seguro de querer ocultar esta notificación?"
            />
        )
    });
};
