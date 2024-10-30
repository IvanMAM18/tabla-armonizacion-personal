import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TablaTitulos = () => {
    const [nombre, setNombre] = useState('');
    const [puntosOne, setPuntosOne] = useState(0);
    const [puntosTwo, setPuntosTwo] = useState(0);
    const [apartado, setApartado] = useState(0);
    const [tipo, setTipo] = useState('titulo');
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        const response = await axios.get('/titulos');
        setData(response.data);
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
    const [totalPages, setTotalPages] = useState(0);

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
    }, []);

    return (
        <div className="p-4">
            <div className='relative w-11/12 mt-2 mx-auto overflow-x-auto'>
                <div className="flex justify-between mb-2 text-white">
                    <select
                        value={resultsPerPage}
                        onChange={handleResultsPerPageChange}
                        className="border py-1 pr-8 rounded bg-emerald-950 font-semibold"
                    >
                        <option value={10}>Mostrar 10</option>
                        <option value={15}>Mostrar 15</option>
                        <option value={20}>Mostrar 20</option>
                        <option value={25}>Mostrar 25</option>
                        <option value={50}>Mostrar 50</option>
                    </select>
                </div>
                <table className="table-auto w-full">
                    <thead className=''>
                        <tr className='text-center'>
                            <th className='relative bg-emerald-700 text-white rounded-tr-lg'>
                                CLASIFICACIÓN DE VARIABLES TÉCNICAS
                            </th>
                            <th className='relative bg-emerald-700 text-white rounded-tl-lg'>
                                PUNTOS
                            </th>
                            <th className='relative  bg-emerald-700 text-white'>
                                PUNTOS
                            </th>
                            <th className='relative  bg-emerald-700 text-white'>
                                ARCHIVOS
                            </th>
                            <th className='relative  bg-emerald-700 text-white'>
                                FORMATOS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((record, index) => (
                            <tr key={index}>
                                <td className='border border-y-slate-600 pl-2'>{record.nombre}</td>
                                <td className='border border-y-slate-600 text-center'>{record.puntosOne}</td>
                                <td className='border border-y-slate-600 text-center'>{record.puntosTwo}</td>
                                <td className='border border-y-slate-600 text-center'>{record.apartado}</td>
                                <td className='border border-y-slate-600 text-center'>{record.tipo}</td>
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
                                className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
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
        </div>
    );
};

export default TablaTitulos;