// DeleteModal.js
import React from 'react';

const ModalEliminarRegistro = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-4/5">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &times;
                </button>
                <h2 className="text-lg font-bold mb-4 text-center">¿Estás seguro de que deseas eliminar esto?</h2>
                <div className="flex justify-center">
                    <button 
                        onClick={onClose} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEliminarRegistro;