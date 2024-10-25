import React, { useState, useEffect } from 'react';
const ModalTwo = ({ isOpen, onClose, data, onUpdate }) => { const [formData, setFormData] = useState({ clasificacion: '', puntosOne: '', puntosTwo: '', archivo: '', formato: '', });

useEffect(() => {
    if (data) {
        setFormData(data);
    } else {
        setFormData({
            clasificacion: '',
            puntosOne: '',
            puntosTwo: '',
            archivo: '',
            formato: '',
        });
    }
}, [data]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (data) {
        await updateRecord(data.id, formData);
    } else {
        await addRecord(formData);
    }
    onUpdate();
    onClose();
};

const addRecord = async (newData) => {
    const response = await fetch('/tabla-data-armonizacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    });

    if (!response.ok) {
        throw new Error('Error al agregar el registro');
    }
};

const updateRecord = async (id, updatedData) => {
    const response = await fetch(`/tabla-data-armonizacion/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el registro');
    }
};

if (!isOpen) return null;

return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">{data ? 'Editar Registro' : 'Agregar Registro'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Clasificación:</label>
                    <input
                        type="text"
                        name="clasificacion"
                        value={formData.clasificacion}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Puntos One:</label>
                    <input
                        type="text"
                        name="puntosOne"
                        value={formData.puntosOne}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Puntos Two:</label>
                    <input
                        type="text"
                        name="puntosTwo"
                        value={formData.puntosTwo}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Archivo:</label>
                    <input
                        type="text"
                        name="archivo"
                        value={formData.archivo}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Formato:</label>
                    <input
                        type="text"
                        name="formato"
                        value={formData.formato}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {data ? 'Actualizar' : 'Agregar'}
                </button>
                <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2">
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalTwo;