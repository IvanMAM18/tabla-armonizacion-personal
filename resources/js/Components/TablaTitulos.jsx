import React, { useState, useEffect } from 'react';
import ModalCarpetas from './ModalCarpetas';
import axios from 'axios';

export default function TablaTitulos () {

    const [data, setData] = useState([]);
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalTipo, setModalTipo] = useState('');

    const handleOpenModal = (id, type) => {
        setModalId(id);
        setModalTipo(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    

    const fetchData = async () => {
        try {
            const response = await axios.get('/titulos');
            setData(response.data);
        } catch (error) {
            console.error("Error fetching titulos:", error);
        }
    };

    const fetchLogs = async () => {
        try {
            const response = await axios.get('/logs');
            setLogs(response.data);
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    };


    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / resultsPerPage);

    const handleResultsPerPageChange = (e) => {
        setResultsPerPage(Number(e.target.value));
        setCurrentPage(1); // Resetear a la primera página al cambiar resultados por página
        setTotalPages(Math.ceil(data.length / Number(e.target.value))); // Actualizar total de páginas
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calcular los índices de los datos a mostrar
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    useEffect(() => {
        fetchData();
        fetchLogs();
    }, []);

    useEffect(() => {
        // Filtrar logs según el id_titulo de los títulos
        const newFilteredLogs = logs.filter(log => 
            data.some(record => record.id === log.id_titulo)
        );

        setFilteredLogs(newFilteredLogs);
    }, [data, logs]);


    return (
        <div className="y-4">
            <div className='relative mt-2 mx-auto overflow-x-auto'>
                <div className="flex justify-between mb-2 text-white ">
                    <select
                        value={resultsPerPage}
                        onChange={handleResultsPerPageChange}
                        className="py-1 pr-8 rounded border-transparent bg-emerald-950 font-normal cursor-pointer"
                    >
                        <option  value={10}> Mostrar 10 </option>
                        <option  value={15}> Mostrar 15 </option>
                        <option  value={20}> Mostrar 20 </option>
                        <option  value={25}> Mostrar 25 </option>
                        <option  value={50}> Mostrar 50 </option>
                    </select>
                </div>
                
                <table className="table-auto w-full">
                    <thead>
                        <tr className='text-center '>
                            <th className='relative bg-emerald-700 text-white font-normal rounded-tl'>
                                CLASIFICACIÓN DE VARIABLES TÉCNICAS
                            </th>
                            <th className='relative px-2 bg-emerald-700 font-normal text-white'>
                                PUNTOS
                            </th>
                            <th className='relative px-2 bg-emerald-700 font-normal text-white'>
                                PUNTOS
                            </th>
                            <th className='relative px-2 bg-emerald-700 font-normal text-white'>
                                ARCHIVOS
                            </th>
                            <th className='relative px-2 bg-emerald-700 font-normal text-white rounded-tr'>
                                FORMATOS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="rounded">
                        {currentData.map((record, index) => (
                            <tr key={index} className={`${record.tipo === 'titulo' ? 'bg-orange-200' : ''}`}>
                                <td className='border border-y-slate-600 border-l-slate-600 pl-2'>{record.nombre}</td>
                                <td className='border border-y-slate-600 text-center'>{record.puntosOne}</td>
                                <td className='border border-y-slate-600 text-center'>{record.puntosTwo}</td>
                                
                                <td className='border border-y-slate-600 text-center'>
                                    <svg 
                                        onClick={() => handleOpenModal(record.id, 'ARCHIVOS')} 
                                        className="h-5 w-5 mx-auto text-emerald-900 cursor-pointer" 
                                        width="24" height="24" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="2" 
                                        stroke="currentColor" 
                                        fill="none" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round">
                                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                                    </svg>
                                </td>
                                
                                <td className='border border-y-slate-600 text-center'>
                                    <svg 
                                        onClick={() => handleOpenModal(record.id, 'FORMATOS')} 
                                        className="h-5 w-5 mx-auto text-emerald-900 cursor-pointer" 
                                        width="24" height="24" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="2" 
                                        stroke="currentColor" 
                                        fill="none" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round">
                                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                                    </svg>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalCarpetas isOpen={isModalOpen} onClose={handleCloseModal} id={modalId} tipo={modalTipo} />
                <div className="flex justify-center mt-4">
                    <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-emerald-950 text-white' : 'bg-white text-black'}`}
                        >
                            {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="my-4 text-center">
                    <span>
                        Mostrando {currentData.length} de {data.length} resultados en la página {currentPage} de {totalPages}.
                    </span>
                </div>
            </div>
        </div>
    );
};
