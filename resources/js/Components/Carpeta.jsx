import React, { useState, useEffect } from 'react';

export default function Carpeta({ id, tipo }) {

    const numericId = Number(id);
    const [titulos, setTitulos] = useState([]);
    const [logs, setLogs] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateOption, setDateOption] = useState('');
    const [manualDate, setManualDate] = useState('');
    const [tempDate, setTempDate] = useState(''); // Estado temporal para la fecha
    
    const [file, setFile] = useState(null);
    const [date, setDate] = useState('');
    const [showDateInput, setShowDateInput] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true); // Cambia el estado a true cuando se está arrastrando
    };

    const handleDragLeave = () => {
        setIsDragging(false); // Cambia el estado a false cuando se sale del área
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
        setShowDateInput(true); // Mostrar el input de fecha al soltar el archivo
        setIsDragging(false); // Restablecer el estado de arrastre
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSave = () => {
        // Lógica para guardar el archivo y la fecha
        console.log('Archivo guardado:', file.name, 'Fecha:', date);
        // Aquí puedes agregar la lógica para enviar el archivo
    };

    const handleCancel = () => {
        setFile(null);
        setDate('');
        setShowDateInput(false); // Ocultar el input de fecha
    };


    const handleOptionClick = (option) => {
        setDateOption(option);
        setShowOptions(false);
    };

    const handleSubmit = () => {
        // Aquí puedes manejar la lógica para aplicar la fecha
        setDateOption(tempDate); // Actualiza la opción de fecha con la fecha temporal
        setShowOptions(false); // Cierra las opciones
    };

    const fetchTitulos = async () => {
        try {
            const response = await axios.get('/titulos');
            setTitulos(response.data);
        } catch (error) {
            console.error("Error fetching titulos:", error);
        }
    };

    const fetchLogs = async () => {
        try {
            const response = await axios.get('/logs');
            setLogs(response.data);
        } catch (error) {
            console.error("Error fetching titulos:", error);
        }
    };

    useEffect(() => {
        fetchTitulos();
        fetchLogs();
    }, []);

    return (
        <>
            <div className="relative w-full pt-4 bg-dots-darker bg-center bg-white dark:bg-white selection:bg-red-500 selection:text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="w-full text-emerald-950">
                        {titulos.map((dataTitulos) => (
                            dataTitulos.id  === numericId ? (
                                <div key={dataTitulos.id}>
                                    <h1  className="text-2xl font-bold">{dataTitulos.nombre}</h1>
                                </div>
                            ) : null
                            ))
                        }
                    </div>
                    <div className="relative">
                        <div className="mt-4">
                            BUSQUEDA DE FECHA ESTABLECIDA
                        </div>
                        <button
                            className='mt-1 p-1 flex items-center justify-center border border-emerald-800 rounded hover:bg-emerald-950 hover:text-white'
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
                                <div className="my-1 pl-3 items-center">
                                        SELECCIONAR FECHA:
                                    <div className='flex'>
                                        <input
                                            type="date"
                                            value={tempDate}
                                            onChange={(e) => setTempDate(e.target.value)} // Actualiza la fecha temporal
                                            className="block w-full border border-gray-300 rounded"
                                        />
                                        <button
                                            className="bg-emerald-800 text-white rounded ml-1 px-1 hover:bg-emerald-950"
                                            onClick={handleSubmit}
                                        >
                                            APLICAR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`w-full mt-4 h-[20vw] mx-auto rounded-lg border-2 p-10 transition-colors 
                        ${ isDragging ? 'border-emerald-950 bg-emerald-100 opacity-75 border-dashed' : 'border-emerald-950'} 
                        ${showDateInput ?'bg-emerald-950 text-gray-600':''}
                        opacity-80 transition-colors duration-300 overflow-y-auto relative`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        
                        {showDateInput && (
                            <div className="absolute mx-auto w-96 top-10 left-0 right-0 mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100 z-10">
                                <p className="">NOMBRE: {file.name}</p>
                                <p className="">ESTABLECER FECHA DEL {tipo}:</p>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={handleDateChange}
                                    className="mt-2 block w-full border border-gray-300 rounded p-2"
                                />
                                <div className="text-center mt-4">
                                    <button
                                        onClick={handleSave}
                                        className="bg-emerald-950 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-orange-300 text-white ml-2 px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                        {
                            logs.length === 0 ? (
                                <div
                                    className={`p-10 rounded-lg transition-colors `}
                                >
                                    <p className="text-center text-emerald-950">
                                        <svg className="h-20 w-20 text-emerald-950 mx-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                                            <polyline points="9 15 12 12 15 15" />
                                            <line x1="12" y1="12" x2="12" y2="21" />
                                        </svg>
                                        CARPETA VACIA, ARRASTRA {tipo} DESEADOS
                                    </p>
                                </div>
                            ) : (
                                    <table className='w-full text-left rounded'>
                                        <thead className={`text-xs border-b ${showDateInput ?'':'text-emerald-950'}`}>
                                            <tr>
                                                <th className='pl-2'>NOMBRE DEL ARCHIVO</th>
                                                <th className='text-center'>SUBIDO</th>
                                                <th className='text-center'>FECHA DEL ARCHIVO</th>
                                                <th className='text-center'>ACCION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    
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
                            )
                        }
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
