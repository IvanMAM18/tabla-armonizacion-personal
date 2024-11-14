import React, { useState, useEffect } from 'react';
import Carpeta from './Carpeta';
import axios from 'axios';

export default function ModalCarpetas ({ isOpen, onClose, id , tipo}) {
    const numericId = Number(id);
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 pb-10">
                <div className='bg-emerald-950 w-full h-8 text-white text-center rounded-t flex justify-between p-2 items-center'>
                    <div className="flex-grow text-center">CARPETA DE EDICION {tipo}</div>
                    <div className='mt-2'>
                        <button onClick={onClose} className="bg-orange-300 text-white rounded hover:bg-red-400 ">
                            <svg className="h-5 w-5 " width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>  
                                <line x1="18" y1="6" x2="6" y2="18" />  
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
                <Carpeta id={id} tipo={tipo}></Carpeta>
            </div>
        </div>
    );
}