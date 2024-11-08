import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ColumnsTitulos from '@/Layouts/ColumnsTitulos';
import DatePicker from 'react-datepicker'; // Asegúrate de instalar react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos del DatePicker
import { Head } from '@inertiajs/react';

export default function Carpeta({ auth , tipo, id }) {

    const numericId = Number(id);
    const [data, setData] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateOption, setDateOption] = useState('');
    const [manualDate, setManualDate] = useState('');
    const [tempDate, setTempDate] = useState(null); // Estado temporal para la fecha

    const handleOptionClick = (option) => {
        setDateOption('');
        setTempDate('');
        setSelectedDate(null);
        setDateOption(option);
        setShowOptions(false);
    };

    const handleManualDateChange = (e) => {
        const inputDate = e.target.value;
        setManualDate(inputDate);
        setDateOption(inputDate);
        
        // Intenta convertir la fecha escrita a un objeto Date
        const parsedDate = new Date(inputDate.split('/').reverse().join('-'));
        if (!isNaN(parsedDate)) {
            setTempDate(parsedDate); // Actualiza la fecha temporal
        }
    };

    const handleSubmit = () => {
        // Aplica la fecha seleccionada o escrita
        const formattedDate = tempDate ? tempDate.toLocaleDateString() : '';
        setDateOption(formattedDate);
        setSelectedDate(tempDate);
        setShowOptions(false); // Cierra las opciones al aplicar
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
        <>
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    INICIO - CARPETA DE {id} {tipo}S
                </h2>}
            >
            <Head title="Inicio-sesion inciada"/>
            <div className="relative w-full h-screen pt-4 bg-dots-darker bg-center bg-white dark:bg-white selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="w-full text-emerald-950">
                        {data.map((titulos) => (
                            titulos.id  === numericId ? (
                                <div key={titulos.id}>
                                    {data.map((titulo)=>(
                                        titulo.apartado === titulos.apartado ? 
                                        (
                                            titulo.tipo === 'titulo' ? (
                                                <span key={titulo.id}>CLASIFICACION DE VARIABLES TECNICAS: {titulo.nombre}</span>
                                            ) : null
                                        ) 
                                        : null
                                    ))}
                                    <h1  className="text-2xl font-bold">CARPETA: {titulos.nombre}</h1>
                                </div>
                            ) : null
                            ))
                        }
                    </div>
                    <div className="relative">
            <button
                className='mt-4 p-1 flex items-center justify-center border border-emerald-800 rounded hover:bg-emerald-950 hover:text-white'
                onClick={() => setShowOptions(!showOptions)}
            >
                FECHA DEL {tipo}: {dateOption || '00/00/0000'}
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
                <div className="relative mt-2 w-[400px] bg-white border border-emerald-800 rounded shadow-lg">
                    <button
                        className="w-full py-2 px-3 text-left border-b border-emerald-800 hover:bg-emerald-950 hover:text-white"
                        onClick={() => handleOptionClick('CUALQUIER FECHA')}
                    >
                        CUALQUIER FECHA
                    </button>
                    <div className="flex my-1 pl-3 items-center">
                        SELECCIONAR FECHA:
                        <DatePicker
                            selected={tempDate} // Usa la fecha temporal
                            onChange={(date) => {
                                setTempDate(date); // Actualiza la fecha temporal
                            }}
                            dateFormat="dd/MM/yyyy"
                            className="border border-emerald-800 rounded p-1 ml-2 text-center w-28"
                        />
                        <button
                            className="bg-emerald-800 text-white rounded ml-1 px-3 py-1 hover:bg-emerald-950"
                            onClick={handleSubmit}
                        >
                            APLICAR
                        </button>
                    </div>
                </div>
            )}
        </div>
                    
                    <div className="w-full mt-4  text-emerald-950 rounded py-2 border border-emerald-800">
                        <div className={`w-11/12 h-[30vw] mx-auto rounded-lg opacity-80 transition-colors duration-300 overflow-y-auto`}>
                            <table className='w-full text-left rounded '>
                                <thead className='text-xs text-emerald-950 bg-white border-b'>
                                    <tr>
                                        <th className='pl-2'>NOMBRE DEL ARCHIVO</th>
                                        <th className='text-center'>SUBIDO</th>
                                        <th className='text-center'>FECHA DEL ARCHIVO</th>
                                        <th className='text-center'>ACCION</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b  hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex hover:rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className='border-b hover:bg-emerald-950 hover:text-white hover:shadow'>
                                        <td className='p-2 flex rounded'> 
                                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeLinecap="round" 
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            NOMBRE DEL ARCHIVO
                                        </td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td className='text-center'>00/00/0000</td>
                                        <td>
                                            <svg className="h-5 w-5 hover:rounded hover:text-red-500 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />  
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <line x1="10" y1="11" x2="10" y2="17" />  
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ColumnsTitulos></ColumnsTitulos>
                </div>
            </div>
        </AuthenticatedLayout>
        
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
