import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OptionTitulo = () => {
    const [data, setData] = useState([]);
    const [isTable, setIsTable] = useState(true); // Estado para determinar si está en modo "tabla"


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
        <div className="y-4">
                <span>CARPETAS GENERALES</span><br />
            <div className="relative inline-flex items-center">
                <span>CLASIFICACION DE VARIABLES TECNICAS</span>
                <button
                    onClick={() => setIsTable(true)}
                    className={`flex items-center justify-center w-12 h-8 rounded-l-lg transition-colors duration-300 ${isTable ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                    <svg className="h-5 w-5 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                <button
                    onClick={() => setIsTable(false)}
                    className={`flex items-center justify-center w-12 h-8 rounded-r-lg transition-colors duration-300 ${!isTable ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                    <svg className="h-5 w-5 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>  
                        <rect x="4" y="4" width="6" height="6" rx="1" />  
                        <rect x="14" y="4" width="6" height="6" rx="1" />  
                        <rect x="4" y="14" width="6" height="6" rx="1" />  
                        <rect x="14" y="14" width="6" height="6" rx="1" />
                    </svg>
                </button>
            </div>
                <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-lg text-gray-700">
                    {isTable ? 'Tabla' : 'Divs'}
                </span>
            {/* Botón Switch */}
            
        </div>
    );
};

export default OptionTitulo;