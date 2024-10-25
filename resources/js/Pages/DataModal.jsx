import React, { useState, useEffect } from 'react';
import DataModal from './DataModal'; // Asegúrate de importar el componente

const DataTable = () => {
    const [records, setRecords] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        const response = await fetch('/tabla-data-armonizacion');
        const data = await response.json();
        setRecords(data);
    };

    const handleRowClick = (record) => {
        setSelectedRecord(record);
        setModalOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Clasificación</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id} onClick={() => handleRowClick(record)} className="cursor-pointer hover:bg-gray-100">
                            <td className="border px-4 py-2">{record.id}</td>
                            <td className="border px-4 py-2">{record.clasificacion}</td>
                            <td className="border px-4 py-2">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Editar
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DataModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                data={selectedRecord}
            />
        </div>
    );
};

export default DataTable;