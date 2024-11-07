import React, { useState, useEffect } from 'react';
import TablaTitulos from '@/Layouts/TablaTitulos';
import ColumnsTitulos from '@/Layouts/ColumnsTitulos';
import axios from 'axios';

const OptionTitulo = () => {
    const [isTable, setIsTable] = useState(true); // Estado para determinar qué componente mostrar
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
    const [selectArchivoFormato, setSelectArchivoFormato] = useState('ARCHIVO'); // Estado para almacenar la selección
    const [showOptions, setShowOptions] = useState(false); // Estado para mostrar/ocultar opciones

    const handleToggleOptions = () => {
        setShowOptions(!showOptions); // Alternar la visibilidad de las opciones
    };

    const handleSelectOption = (opcion) => {
        setSelectArchivoFormato(opcion); // Actualizar el estado con la opción seleccionada
        setShowOptions(false); // Cerrar las opciones después de seleccionar
    };

    const handleToggleTable = (table) => {
        //setLoading(true); // Activar el estado de carga
        // setTimeout(() => {
        //     setIsTable(table); // Cambiar el componente
        //     setLoading(false); // Desactivar el estado de carga
        // }, 1000); // 1 segundos
        setIsTable(table); 
        setLoading(false);
    };

    return (
        <div className="mt-2">
            <div className="relative">
                {isTable ? (
                    <div className="text-sm text-emerald-950 font-medium cursor-pointer">
                        CARPETAS GENERALES
                    </div>
                ) : (
                    <div 
                        className="text-sm text-emerald-950 flex font-medium cursor-pointer" 
                        onClick={handleToggleOptions} // Manejar el clic en "CARPETAS GENERALES"
                    >
                        CARPETAS GENERALES - 
                        <div className='px-4 flex'>
                            {selectArchivoFormato}
                            <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div> 
                    </div>
                )}
                {showOptions && (
                    <div className="absolute left-44 top-2 my-3 border border-emerald-950 bg-teal-800 text-white p-2 rounded shadow z-10 max-h-80 overflow-y-auto">
                        <div 
                            className="w-full p-1 hover:bg-emerald-200 hover:text-emerald-950 rounded cursor-pointer"
                            onClick={() => handleSelectOption('ARCHIVO')} // Manejar clic en "ARCHIVO"
                        >
                            ARCHIVO
                        </div>  
                        <div 
                            className="w-full p-1 hover:bg-emerald-200 hover:text-emerald-950 rounded cursor-pointer"
                            onClick={() => handleSelectOption('FORMATO')} // Manejar clic en "FORMATO"
                        >
                            FORMATO
                        </div>               
                    </div>
                )}
            </div>                
            <div className="relative inline-flex items-center justify-between w-full">
                <span className='text-xl text-emerald-950 font-medium'>CLASIFICACION DE VARIABLES TECNICAS</span>
                <div className='flex justify-end'>
                    <button
                        onClick={() => handleToggleTable(true)} // Cambiar a Tabla
                        className={`flex items-center justify-center w-12 h-8 rounded-l-lg transition-colors duration-300 ${isTable ? 'bg-emerald-700 text-white' : 'bg-transparent border border-emerald-700 text-emerald-700'}`}
                    >
                        <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                    <button
                        onClick={() => handleToggleTable(false)} // Cambiar a Columns
                        className={`flex items-center justify-center w-12 h-8 rounded-r-lg transition-colors duration-300 ${!isTable ? 'bg-emerald-700 text-white' : 'bg-transparent border border-emerald-700 text-emerald-700'}`}
                    >
                        <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <rect x="4" y="4" width="6" height="6" rx="1" />  
                            <rect x="14" y="4" width="6" height="6" rx="1" />  
                            <rect x="4" y="14" width="6" height="6" rx="1" />  
                            <rect x="14" y="14" width="6" height="6" rx="1" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* {loading && (
                <div className="relative w-full">
                    <div className="absolute h-[35vw] inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
                        <div className="text-white text-lg">Cargando...</div>
                    </div>
                </div>
            )} */}
            {isTable ? (<TablaTitulos/>) : (<ColumnsTitulos selectArchivoFormato={selectArchivoFormato}/>)}
        </div>
    );
};

export default OptionTitulo;