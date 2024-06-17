import 'react-confirm-alert/src/react-confirm-alert.css'; // Estilos por defecto

export const ModalConfirm = ({ onClose, onConfirm, message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-200 flex flex-col items-center justify-center p-8 rounded-lg">
                <p className="text-lg text-black mb-4">{message}</p>
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => {
                            onClose();
                            onConfirm();
                        }}
                    >
                        Confirmar
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};
