import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CarpetaPublica({ id, tipo , nombre}) {

    const numericId = Number(id);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const [dateOption, setDateOption] = useState('CUALQUIER FECHA');
    const [tempDate, setTempDate] = useState(''); // Estado temporal para la fecha
    const [errorMessage, setErrorMessage] = useState('');
    const tipoLog = (tipo === "ARCHIVOS" ? "archivo" : "formato"); // Usa una variable diferente

    const handleOptionClick = (option) => {
        setDateOption(option);
        setTempDate('');
        setShowOptions(false);
    };

    const handleSubmit = () => {
        // Aquí puedes manejar la lógica para aplicar la fecha
        setDateOption(tempDate); // Actualiza la opción de fecha con la fecha temporal
        setShowOptions(false); // Cierra las opciones
    };

    const fetchLogs = async () => {
        try {
            const response = await axios.get('/logsPublicos');
            setLogs(response.data);
        } catch (error) {
            console.error("Error fetching logs:", error);
        }finally {
            setLoading(false); // Asegúrate de cambiar el estado de carga al final
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(log => log.id_titulo === numericId &&
        log.tipo_log === tipoLog );

    const filteredLogsDate = filteredLogs.filter(
        log => (dateOption === 'CUALQUIER FECHA' || log.fecha_establecida === dateOption) &&
        log.tipo_log === tipoLog );

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options).replace(/ de /g, ' de ');
    };

    return (
        <>
            <div className="relative w-full pt-4 bg-dots-darker bg-center bg-white dark:bg-white selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="w-full text-emerald-950">
                        <h1  className="text-2xl font-bold">{nombre}</h1>
                    </div>
                    <div className="relative mb-4">
                        <div className="mt-4">
                            BUSQUEDA DE FECHA ESTABLECIDA
                        </div>
                        <button
                            className='mt-1 p-1 flex items-center justify-center border border-emerald-800 rounded hover:bg-emerald-950 hover:text-white'
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            FECHA DE {tipo}: {dateOption}
                            <svg className="h-5 w-5 ml-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect x="4" y="5" width="16" height="16" rx="2" />
                                <line x1="16" y1="3" x2="16" y2="7" />
                                <line x1="8" y1="3" x2="8" y2="7" />
                                <line x1="4" y1="11" x2="20" y2="11" />
                                <rect x="8" y="15" width="2" height="2" />
                            </svg>
                        </button>

                        {showOptions && (
                            <div className="absolute w-max mt-1 bg-emerald-800 rounded shadow-lg text-white z-50">
                                <button
                                    className="w-full py-2 px-3 text-left rounded border-b border-emerald-700 hover:bg-emerald-950"
                                    onClick={() => {
                                        handleOptionClick('CUALQUIER FECHA');
                                        setErrorMessage('');
                                    }}
                                >
                                    CUALQUIER FECHA
                                </button>
                                <div className="my-1 pl-3 items-center flex">
                                    <div>
                                        SELECCIONAR FECHA:
                                    </div>
                                    <div className='flex ml-2'>
                                        <input
                                            type="date"
                                            value={tempDate}
                                            onChange={(e) => {
                                                setTempDate(e.target.value);
                                                setErrorMessage('');
                                            }}
                                            className="block border border-gray-300 rounded text-gray-500"
                                        />
                                        <button
                                            className="bg-emerald-700 text-white rounded mx-1 px-1 hover:bg-emerald-950"
                                            onClick={() => {
                                                if (!tempDate) {
                                                    setErrorMessage("Ingrese una fecha completa.");
                                                } else {
                                                    handleSubmit();
                                                }
                                            }}
                                        >
                                            APLICAR
                                        </button>
                                    </div>
                                </div>
                                {errorMessage && (
                                    <div className="absolute text-red-300 text-xs top-10 ml-3 ">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={`relative w-full h-[20vw] mx-auto rounded-lg border-2 p-10 transition-colors 
                        border-emerald-950 opacity-80 transition-colors duration-300 overflow-y-auto relative`}
                    >
                        
                        <table className='w-full text-left rounded'>
                            <thead className={`text-xs border-b text-emerald-950`}>
                                <tr>
                                    <th className='pl-2 w-4/5'>NOMBRE {tipo}</th>
                                    <th className='text-center'>FECHA ESTABLECIDA {tipo}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={2} className="p-10 text-center">
                                            <div className="text-emerald-950">
                                                <svg className="animate-spin h-10 w-10 mx-auto text-emerald-950" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                                                </svg>
                                                <p>PROCESANDO INFORMACION...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredLogs.length > 0 ? (
                                    filteredLogsDate.length > 0 ? (
                                        filteredLogsDate.map((log) => (
                                            <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow' key={log.id}>
                                                <td className='p-2 flex rounded'>
                                                    <a 
                                                            href={`http://localhost/tabla-armonizacion-personal/public/uploads/${log.nombre_log}`} 
                                                            target="_blank" 
                                                            download 
                                                            rel="noopener noreferrer" // Mejora de seguridad
                                                            className="flex items-center"
                                                        >
                                                        <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path strokeLinecap="round" 
                                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                        </svg>
                                                        {log.nombre_log}
                                                    </a>
                                                </td>
                                                <td className='text-center'>{formatDate(log.fecha_establecida)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2} className={`p-10 rounded-lg transition-colors`}>
                                                <div className="text-center text-emerald-950">
                                                    <svg className="h-20 w-20 text-emerald-950 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <rect x="4" y="5" width="16" height="16" rx="2" />
                                                        <line x1="16" y1="3" x2="16" y2="7" />
                                                        <line x1="8" y1="3" x2="8" y2="7" />
                                                        <line x1="4" y1="11" x2="20" y2="11" />
                                                        <rect x="8" y="15" width="2" height="2" />
                                                    </svg>
                                                    NO SE ENCUENTRAN {tipo} CON LA FECHA SOLICITADA <br />
                                                    {dateOption}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={2} className={`p-10 rounded-lg transition-colors`}>
                                            <div className="text-center text-emerald-950">
                                                <svg className="h-20 w-20 text-emerald-950 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                                                    <polyline points="9 15 12 12 15 15" />
                                                    <line x1="12" y1="12" x2="12" y2="21" />
                                                </svg>
                                                CARPETA VACIA, ARRASTRA {tipo} DESEADOS
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0, 0, 0, 0.13)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0, 0, 0, 0.13)'/%3E%3C/svg%3E");
                    }
                }

                /* Para Firefox */
                * {
                    scrollbar-width: thin; /* Ancho de la barra de desplazamiento */
                    scrollbar-color: rgba(0, 0, 0, 0.3) rgba(255, 255, 255, 0.2); /* Color de la barra y el fondo */
                }
            `}</style>
        </>
    );
}
