import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataModal = () => {
    const [clasificacion, setClasificacion] = useState('');
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await axios.get('/data-armonizacion');
        setData(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/data-armonizacion', { clasificacion });
        setClasificacion('');
        fetchData();
    };

    const handleDelete = async (id) => {
        await axios.delete(`/data-armonizacion/${id}`);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={clasificacion}
                    onChange={(e) => setClasificacion(e.target.value)}
                    placeholder="Clasificación"
                    required
                />
                <button type="submit">Agregar</button>
            </form>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        {item.clasificacion}
                        <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataModal;