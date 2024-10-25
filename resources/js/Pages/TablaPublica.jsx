import { Head } from '@inertiajs/react';
import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';
//import FileUpload from "@/Components/FileUpload";

export default function TablaPublica({ auth, tablaDataArmonizacion }) {
    const [currentPage, setCurrentPage] = useState(1);
    const fileInputRef = useRef(null);
    const recordsPerPage = 10;
    const [data, setData] = useState([]);

    // Simulación de datos (puedes reemplazar esto con tus datos reales)
    const tablaData = [
        { song: "VARIABLES DE RIESGO </br> Este criterio, pretender analizar el RIESGO del ente, entre más cercano es la ponderacion a 50 puntos, menor es el riesgo del ente con respecto a las variables analizadas.", artist: "", year: 0 },
        { song: "Son 1", artist: "Artist 1", year: 1961 },
        { song: "Song 2", artist: "Artist 2", year: 1962 },
        { song: "Song 3", artist: "Artist 3", year: 1963 },
        { song: "Song 4", artist: "Artist 4", year: 1964 },
        { song: "Song 5", artist: "Artist 5", year: 1965 },
        { song: "Song 6", artist: "Artist 6", year: 1966 },
        { song: "Song 7", artist: "Artist 7", year: 1967 },
        { song: "Song 8", artist: "Artist 8", year: 1968 },
        { song: "Song 9", artist: "Artist 9", year: 1969 },
        { song: "Song 10", artist: "Artist 10", year: 1970 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        { song: "Song 11", artist: "Artist 11", year: 1971 },
        // Agrega más registros según sea necesario
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/tabla-data-armonizacion'); // Cambia la URL según tu configuración
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Calcular los índices de los registros a mostrar
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleButtonClick = () => {
        // Simula un clic en el input de archivo
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:5000/upload', formData);
                alert(`Archivo subido exitosamente: ${response.data.fileName}`);
            } catch (error) {
                console.error('Error al subir el archivo:', error);
                alert('Error al subir el archivo');
            }
        }
    };


    return (
            <>
                <Head title="TablaPublica" />
                <div className="relative w-full h-screen pt-4 bg-center bg-gray-200 dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
                    <div className='relative w-11/12 mt-4 mx-auto'>
                        <div className='bg-gray-500 opacity-35 absolute inset-0 rounded-lg'></div>
                        <div className='border-2 border-gray-500 flex justify-between items-center relative z-10'>
                            <img src="/images/UECASELogo.png" alt="" className='w-[5.3vw] ml-2' />
                            <div className='text-center text-black text-[1.2vw]  px-[5vw]'>
                                <span className='font-bold'>PRESUPUESTO DE PROYECTO PONDERACIÓN PARA LA APROBACIÓN DE CUENTAS PÚBLICAS</span> <br />
                                COMISIÓN DE VIGILANCIA DE LAS ASEBCS <br />
                                UNIDAD DE EVALUACION Y CONTROL DE CVASEBCS
                            </div>
                            <img src="/images/congresoLogo.png" alt="" className='w-[5.2vw] mr-2' />
                        </div>
                    </div>
                    <div className='relative w-11/12 mt-2 mx-auto'>
                        <div className='bg-gray-800 opacity-575 absolute inset-0 rounded-lg'></div>
                        <div className='border-2 border-white relative z-10'>
                            <div className='text-center text-white w-full text-[2vw] font-bold px-[5vw] underline'>
                                CLITERIOS MAYORES
                            </div>
                            <div className='text-center text-white w-full text-[1.2vw] font-bold px-[5vw]'>
                                1. ENTREGA DE CTA PÚBLICA <span className='text-red-500 underline'>(EN TIEMPO Y FORMA)</span> <br />
                                2. SISTEMA CONTABLE ARMONIZADO
                            </div>
                            <div className='text-center text-white w-full text-[1vw] px-[5vw]'>
                                Los criterios Mayores, son elementos de carácter obligatorio por Ley, por lo cual la falta de
                                cumplimiento de estos da como resultado la no aprobación de una Cuenta Pública.
                            </div>
                        </div>
                    </div>
                    <div className='relative w-11/12 mt-2  mx-auto overflow-x-auto'>
                        <table className="table-auto w-full border-collapse border-2 border-slate-600">
                            <thead>
                                <tr className='text-center'>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='relative z-10'>CLASIFICACIÓN DE VARIABLES TÉCNICAS</span>
                                    </th>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='relative z-10'>PUNTOS</span>
                                    </th>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='relative z-10'>PUNTOS</span>
                                    </th>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='relative z-10'>ARCHIVOS</span>
                                    </th>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='relative z-10'>FORMATOS</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map((record, index) => (
                                    <tr key={index}>
                                        {record.puntosOne !== "" ? (
                                            <>
                                                <td className='border border-y-slate-600 pl-2' >{record.clasificacion}</td>
                                                <td className='border border-y-slate-600 text-center'>{record.puntosOne}</td>
                                                <td className='border border-y-slate-600 text-center'>{record.puntosTwo}</td>
                                                {record.archivo === "" ? (
                                                    <td className='border border-y-slate-600 text-center'>
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            onChange={handleFileChange}
                                                            className="hidden" // Oculta el input de archivo
                                                        />
                                                        <button
                                                            onClick={handleButtonClick}>
                                                            <svg className="h-4 w-4 text-gray-900 mr-2 text-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                                                <polyline points="16 6 12 2 8 6" />
                                                                <line x1="12" y1="2" x2="12" y2="15" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                ) : (
                                                    <td className='border border-y-slate-600'>
                                                        <svg class="h-4 w-4 text-green-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />  
                                                        <polyline points="7 10 12 15 17 10" />  
                                                        <line x1="12" y1="15" x2="12" y2="3" /></svg>
                                                    </td>
                                                )}
                                                
                                                <td className='border border-y-slate-600'>
                                                    <svg className="h-4 w-4 text-gray-900 mx-auto text-center" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <rect x="5" y="11" width="14" height="10" rx="2" />
                                                        <circle cx="12" cy="16" r="1" />
                                                        <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                                                    </svg>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className='border border-slate-600 bg-gray-900 text-white pl-2' colSpan="5" dangerouslySetInnerHTML={{ __html: record.clasificacion }}></td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-2 pb-4">
                            {Array.from({ length: Math.ceil(data.length / recordsPerPage) }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                <style>{`
                    .bg-dots-darker {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                    }
                    @media (prefers-color-scheme: dark) {
                        .dark\\:bg-dots-lighter {
                            background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0, 0, 0, 0.13)'/%3E%3C/svg%3E");
                        }
                    }
                `}</style>
            </>
    );
}
