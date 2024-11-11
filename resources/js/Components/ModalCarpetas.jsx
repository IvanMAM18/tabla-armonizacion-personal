import React from 'react';

export default function ModalCarpetas ({ isOpen, onClose, title }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-1/2 p-5">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                    Cerrar
                </button>
            </div>
        </div>
    );
}