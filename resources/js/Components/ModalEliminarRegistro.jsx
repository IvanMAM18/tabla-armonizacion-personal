import React from 'react';

const ModalEliminarRegistro = ({ isOpen, onClose, onConfirm, logName  }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed  inset-0 flex items-center justify-center  bg-gray-900">
            <div className="bg-white w-max rounded-lg p-6 w-4/5">
                <h2 className="text-lg font-bold text-center">Confirmar Eliminación</h2>
                <p>¿Estás seguro que lo deseas eliminar?</p>
                <p className='text-center font-bold text-lg'>{logName}</p>
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={onClose} 
                        className="bg-orange-300 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-blue-500"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEliminarRegistro;