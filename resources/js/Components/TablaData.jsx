import { Head } from '@inertiajs/react';
import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';
import ModalAñadirEliminarRegistro from './ModalAñadirEliminarRegistro';
import ModalEliminarRegistro from './ModalEliminarRegistro';
//import FileUpload from "@/Components/FileUpload";

export default function TablaData({status}) {

    const [currentPage, setCurrentPage] = useState(1);
    const fileInputRef = useRef(null);
    const recordsPerPage = 10;
    const [data, setData] = useState([]);

    const [isDataModalOpen, setIsDataModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentData, setCurrentData] = useState(null); // Para almacenar datos del registro actual
    const [modalMode, setModalMode] = useState('add'); // 'add' o 'edit'

    const openDataModal = (data = null, mode = 'add') => {
        setCurrentData(data); // Si hay datos, se pasan al modal
        setModalMode(mode); // Establecer el modo del modal
        setIsDataModalOpen(true);
    };

    const closeDataModal = () => {
        setIsDataModalOpen(false);
        setCurrentData(null); // Limpiar datos al cerrar
    };

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);


    function update(data){
        patch(route('tabla-data-armonizacion.update', data),{
            onSuccess: () => reset(),
            preserveState: false,
        })
    }
    const saveData = (data) => {

        if(modalMode === 'add'){
            console.log("Datos guardados:", data);
        }else{
            console.log("Datos editado:", data);
            // patch(route('tabla-data-armonizacion.update', data),{
            //     onSuccess: () => reset(),
            //     preserveState: false,
            // })
        }
        // Aquí puedes agregar la lógica para guardar los datos
        closeDataModal();
    };

    const confirmDelete = () => {
        console.log("Elemento eliminado");
        route('tabla-data-armonizacion.destroy', 1);
        closeDeleteModal();
    };

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
                <div className="w-full bg-center dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
                    <div className='w-11/12 mx-auto flex justify-end items-center'>
                                <div className="flex items-center">
                                    <button 
                                        onClick={() => openDataModal(null, 'add')}
                                        className="flex items-center rounded hover:text-green-700"
                                    >
                                    <span className="mr-2">Añadir nuevo registro</span>
                                        <svg className="h-6 w-6 text-green-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                                            <path stroke="none" d="M0 0h24v24H0z"/>  
                                            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />  
                                            <path d="M4 16v2a2 2 0 0 0 2 2h2" />  
                                            <path d="M16 4h2a2 2 0 0 1 2 2v2" />  
                                            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />  
                                            <line x1="9" y1="12" x2="15" y2="12" />  
                                            <line x1="12" y1="9" x2="12" y2="15" />
                                        </svg>
                                    </button>
                                </div>
                    </div>
                    <div className='relative w-11/12 mt-2  mx-auto overflow-x-auto'>
                        <table className="table-auto w-full border-collapse border-2 border-slate-600">
                            
                            <thead>
                                <tr className='text-center'>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='z-10'>CLASIFICACIÓN DE VARIABLES TÉCNICAS</span>
                                    </th>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='z-10'>PUNTOS</span>
                                    </th>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='z-10'>PUNTOS</span>
                                    </th>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='z-10'>ARCHIVOS</span>
                                    </th>
                                    <th className='relative border border-slate-600'>
                                        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                        <span className='z-10'>FORMATOS</span>
                                    </th>
                                    {status ==='editable' ?(
                                        <th className='relative border border-slate-600'>
                                            <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
                                            <span className='z-10'>ACCIONES</span>
                                        </th>
                                    ):(
                                        ''
                                    )}
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
                                                        {/* <input
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
                                                        </button> */}  
                                                            <svg className="h-4 w-4 text-gray-900 mx-auto text-center" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />  
                                                            <polyline points="14 2 14 8 20 8" />  
                                                            <line x1="9" y1="15" x2="15" y2="15" />
                                                        </svg>                                                 
                                                        </td>
                                                ) : (
                                                    <td className='border border-y-slate-600 text-center'>
                                                        <svg className="h-4 w-4 text-gray-900 mx-auto text-center" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                                                            <path stroke="none" d="M0 0h24v24H0z"/>  
                                                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />  
                                                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  
                                                            <polyline points="9 14 12 17 15 14" />
                                                        </svg> 
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
                                                {status ==='editable' ? (
                                                    <td className='relative border border-slate-600 '>
                                                        <div className="flex items-center justify-center space-x-2">
                                                            {/* Botón de Editar */}
                                                            <button onClick={() => openDataModal(record, 'edit')}  >
                                                            <svg className="h-4 w-4 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                            </svg>
                                                            </button>

                                                            {/* Botón de Eliminar */}
                                                            <button onClick={openDeleteModal} >
                                                                <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="3 6 5 6 21 6" />
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                    <line x1="10" y1="11" x2="10" y2="17" />
                                                                    <line x1="14" y1="11" x2="14" y2="17" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                ):(
                                                    ''
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {status ==='editable' ?(
                                                    <td className='border border-slate-600 bg-gray-900 text-white pl-2' colSpan="6" dangerouslySetInnerHTML={{ __html: record.clasificacion }}></td>
                                                )
                                                :(
                                                    <td className='border border-slate-600 bg-gray-900 text-white pl-2' colSpan="5" dangerouslySetInnerHTML={{ __html: record.clasificacion }}></td>
                                                )
                                                }
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
                    <ModalAñadirEliminarRegistro 
                        isOpen={isDataModalOpen} 
                        onClose={closeDataModal} 
                        onSave={saveData} 
                        initialData={currentData} // Pasar datos iniciales al modal
                        mode={modalMode} // Pasar el modo al modal
                    />
                    <ModalEliminarRegistro 
                        isOpen={isDeleteModalOpen} 
                        onClose={closeDeleteModal} 
                        onConfirm={confirmDelete} 
                    />
                </div>
            </>
    );
}
