import React from 'react';

const DataModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Detalles del Registro</h2>
                <div className="mb-4">
                    <strong>Clasificación:</strong> {data.clasificacion}
                </div>
                <div className="mb-4">
                    <strong>Puntos One:</strong> {data.puntosOne}
                </div>
                <div className="mb-4">
                    <strong>Puntos Two:</strong> {data.puntosTwo}
                </div>
                <div className="mb-4">
                    <strong>Archivo:</strong> {data.archivo}
                </div>
                <div className="mb-4">
                    <strong>Formato:</strong> {data.formato}
                </div>
                <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default DataModal;