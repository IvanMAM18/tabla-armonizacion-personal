// DataModal.js
import React, { useEffect, useState } from 'react';

const ModalAñadirEliminarRegistro = ({ isOpen, onClose, onSave, initialData, mode }) => {

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                clasificacion: initialData.clasificacion || '',
                puntosOne: initialData.puntosOne || '',
                puntosTwo: initialData.puntosTwo || '',
                archivos: null,
                formatos: null,
            });
        } else {
            setFormData({
                clasificacion: '',
                puntosOne: '',
                puntosTwo: '',
                archivos: null,
                formatos: null,
            });
        }
    }, [initialData]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0] ? files[0].name : '',
        });
    };
    function update(formData){
        patch(route('tabla-data-armonizacion.update', formData),{
            onSuccess: () => reset(),
            preserveState: false,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        update(formData.id);
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-4/5 rounded-lg p-6 w-1/3">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                &times;
            </button>
            <h2 className="text-lg font-bold mb-4">{mode === 'add' ? 'Añadir Nuevo Registro' : 'Editar Registro'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Clasificación</label>
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
                    <label className="block text-gray-700">Puntos One</label>
                    <input
                        type="text"
                        name="puntosOne"
                        value={formData.puntosOne}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Puntos Two</label>
                    <input
                        type="text"
                        name="puntosTwo"
                        value={formData.puntosTwo}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Archivos</label>
                    <input
                        type="file"
                        name="archivos"
                        onChange={handleFileChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Formatos</label>
                    <input
                        type="file"
                        name="formatos"
                        onChange={handleFileChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Guardar
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAñadirEliminarRegistro;