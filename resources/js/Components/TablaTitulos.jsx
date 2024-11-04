import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TablaTitulos = () => {
    const [nombre, setNombre] = useState('');
    const [puntosOne, setPuntosOne] = useState(0);
    const [puntosTwo, setPuntosTwo] = useState(0);
    const [apartado, setApartado] = useState(0);
    const [tipo, setTipo] = useState('titulo');
    const [editingId, setEditingId] = useState(null);
    const [data, setData] = useState([]);
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [isHoveredFormato, setIsHoveredFormato] = useState(false);
    const [selectedLog, setSelectedLog] = useState({ id: null, tipo: '' }); // Estado para almacenar el id_titulo y tipo

    

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`/titulos/${editingId}`, { nombre, puntosOne, puntosTwo, apartado, tipo });
            setEditingId(null);
        } else {
            await axios.post('/titulos', { nombre, puntosOne, puntosTwo, apartado, tipo });
        }
        resetForm();
        fetchData();
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setNombre(item.nombre);
        setPuntosOne(item.puntosOne);
        setPuntosTwo(item.puntosTwo);
        setApartado(item.apartado);
        setTipo(item.tipo);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/titulos/${id}`);
        fetchData();
    };

    const resetForm = () => {
        setNombre('');
        setPuntosOne(0);
        setPuntosTwo(0);
        setApartado(0);
        setTipo('titulo');
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
                        {/* Celdas para logs de tipo "archivo" */}
                        {filteredLogs.filter(log => log.id_titulo === record.id && log.tipo_log === 'archivo').length > 0 ? (
                            filteredLogs
                                .filter(log => log.id_titulo === record.id && log.tipo_log === 'archivo')
                                .map(log => (
                                    <span key={log.id} 
                                          onClick={() => setSelectedLog({ id: log.id_titulo, tipo: 'archivo' })} // Al hacer clic, se guarda el id_titulo y tipo
                                          className="relative cursor-pointer">
                                        <svg className="h-5 w-5 mx-auto text-emerald-900" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                        </svg>
                                    </span>
                                ))
                        ) : (
                            <span>
                                <svg className="h-5 w-5 mx-auto text-emerald-900" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />  
                                    <line x1="9" y1="13" x2="15" y2="13" />                                        
                                </svg>
                            </span>
                        )}
                    </td>
                    
                    <td className='border border-y-slate-600 text-center'>
                        {/* Celdas para logs de tipo "formato" */}
                        {filteredLogs.filter(log => log.id_titulo === record.id && log.tipo_log === 'formato').length > 0 ? (
                            filteredLogs
                                .filter(log => log.id_titulo === record.id && log.tipo_log === 'formato')
                                .map(log => (
                                    <span key={log.id} 
                                          onClick={() => setSelectedLog({ id: log.id_titulo, tipo: 'formato' })} // Al hacer clic, se guarda el id_titulo y tipo
                                          className="relative cursor-pointer">
                                        <svg className="h-5 w-5 mx-auto text-emerald-900" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                        </svg>
                                    </span>
                                ))
                        ) : (
                            <span>
                                <svg className="h-5 w-5 mx-auto text-emerald-900" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />  
                                    <line x1="9" y1="13" x2="15" y2="13" />                                        
                                </svg>
                            </span>
                        )}
                    </td>
                </tr>
            ))}
                    </tbody>
                </table>
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
                <div className="mt-4 text-center">
                    <span>
                        Mostrando {currentData.length} de {data.length} resultados en la página {currentPage} de {totalPages}.
                    </span>
                </div>
            </div>
            {selectedLog.id && (
                    <span className="text-center text-lg text-blue-600">
                        ID Titulo Seleccionado: {selectedLog.id} - Tipo: {selectedLog.tipo}
                    </span>
            )}
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del Título"
                    required
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="number"
                    step="0.01"
                    value={puntosOne}
                    onChange={(e) => setPuntosOne(parseFloat(e.target.value) || 0)}
                    placeholder="Puntos One"
                    required
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="number"
                    step="0.01"
                    value={puntosTwo}
                    onChange={(e) => setPuntosTwo(parseFloat(e.target.value) || 0)}
                    placeholder="Puntos Two"
                    required
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="number"
                    value={apartado}
                    onChange={(e) => setApartado(parseInt(e.target.value, 10) || 0)}
                    placeholder="Apartado"
                    required
                    className="border p-2 rounded mr-2"
                />
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="border p-2 rounded mr-2"
                >
                    <option value="titulo">Título</option>
                    <option value="subtitulo">Subtítulo</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    {editingId ? 'Actualizar' : 'Agregar'}
                </button>
            </form>
            <ul>
                {data.map(item => (
                    <li key={item.id} className="flex items-center justify-between mb-2">
                        <div>
                            {item.nombre} - {item.puntosOne} - {item.puntosTwo} - {item.apartado} - {item.tipo}
                        </div>
                        <div>
                            <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white py-1 px-2 rounded mr-2">
                                Editar
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white py-1 px-2 rounded">
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
            <h1>Titulos</h1>
            <ul>
                {data.map((titulo) => (
                    <li key={titulo.id}>
                        {titulo.nombre} - Puntos One: {titulo.puntosOne}, Puntos Two: {titulo.puntosTwo}
                        {/* Aquí puedes mostrar los logs relacionados */}
                        <ul>
                            {filteredLogs
                                .filter(log => log.id_titulo === titulo.id)
                                .map(log => (
                                    <li key={log.id}>{log.nombre_log} ({log.tipo_log})</li>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default TablaTitulos;