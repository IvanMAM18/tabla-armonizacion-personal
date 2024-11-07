import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';

const ColumnsTitulos = ({selectArchivoFormato}) => {
    const [data, setData] = useState([]);
    const [expandedId, setExpandedId] = useState(null); // Estado para controlar qué título está expandido

    const handleToggle = (id) => {
        setExpandedId(expandedId === id ? null : id); // Alternar el estado expandido
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('/titulos');
            setData(response.data);
        } catch (error) {
            console.error("Error fetching titulos:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4 mt-2 pb-10">
            {data.map((titulos) => (
                titulos.tipo === 'titulo' ? (
                    <div key={titulos.id} className='relative flex flex-col'>
                        <div 
                            className={`flex items-center justify-between cursor-pointer w-full rounded p-4 hover:bg-emerald-800 hover:text-white hover:opacity-75 ${expandedId === titulos.apartado ? ('bg-emerald-800 text-white opacity-75'):('text-emerald-800 border border-emerald-800')}`} 
                            onClick={() => handleToggle(titulos.apartado)}
                        >
                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            <span>{titulos.nombre}</span>
                            {
                                expandedId === titulos.apartado ? 
                                    (
                                        <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>  
                                            <polyline points="6 15 12 9 18 15" />
                                        </svg>
                                    ) 
                                : (
                                    <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                )
                            }
                        </div>
                        {expandedId === titulos.apartado && (
                            <div className="absolute left-6 w-11/12 my-16 border border-emerald-950 bg-teal-800 text-white p-2 rounded shadow z-10 max-h-80 overflow-y-auto">
                                <Link 
                                    href={`/carpeta/${selectArchivoFormato}/${titulos.id}`} 
                                >
                                    <div className="w-full p-1 hover:bg-emerald-200 hover:text-emerald-950 rounded cursor-pointer">
                                        {titulos.nombre}
                                    </div>
                                    
                                </Link>
                                {data.filter(subtitulo => subtitulo.apartado === expandedId && subtitulo.tipo === 'subtitulo').map((subtitulo) => (
                                    <Link 
                                        key={subtitulo.id} 
                                        href={`/carpeta/${selectArchivoFormato}/${subtitulo.id}`} 
                                    >
                                        <div className="w-full p-1 hover:bg-emerald-200 hover:text-emerald-950 rounded cursor-pointer">
                                            {subtitulo.nombre}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ) : null
            ))}
        </div>

    );
};

export default ColumnsTitulos;