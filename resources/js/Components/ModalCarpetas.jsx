import React, { useState, useEffect } from 'react';
import Carpeta from './Carpeta';
import axios from 'axios';

export default function ModalCarpetas ({ isOpen, onClose, id , tipo}) {
    const numericId = Number(id);
    const [titulos, setTitulos] = useState([]);

    const fetchTitulos = async () => {
        try {
            const response = await axios.get('/titulos');
            setTitulos(response.data);
        } catch (error) {
            console.error("Error fetching titulos:", error);
        }
    };

    useEffect(() => {
        fetchTitulos();
    }, []);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 ">
                <div className='bg-emerald-950 w-full h-10 text-white text-center p-2 rounded-t'>
                    CARPETA DE {tipo}
                </div>
                <Carpeta id={id} tipo={tipo}></Carpeta>
                <div className='text-center pb-4'>
                    <button onClick={onClose} className="mt-4 bg-emerald-950 text-white px-4 py-2 rounded">
                        Guardar
                    </button>
                    <button onClick={onClose} className="mt-4 ml-2 bg-orange-300 text-white px-4 py-2 rounded">
                        Cerrar
                    </button>
                </div>
                
            </div>
        </div>
    );
}