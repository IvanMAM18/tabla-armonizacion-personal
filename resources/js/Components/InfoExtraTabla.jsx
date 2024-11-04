import { Head } from '@inertiajs/react';
import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';
//import FileUpload from "@/Components/FileUpload";

export default function InfoExtraTabla() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 680);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 800);
    };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
            <>
                <div className='relative mt-4 mx-auto'>
                    <div className='bg-emerald-700 relative rounded-lg'>
                        <div className='py-5 rounded-lg flex justify-between items-center relative z-10'>
                            <img src="../images/UECASELogo.png" alt="" className='w-[5.3vw] ml-2' />
                            <div className='text-center text-white text-sm  px-[5vw]'>
                                <span className='font-bold'>PRESUPUESTO DE PROYECTO PONDERACIÓN PARA LA APROBACIÓN DE CUENTAS PÚBLICAS</span> <br />
                                COMISIÓN DE VIGILANCIA DE LAS ASEBCS <br />
                                UNIDAD DE EVALUACION Y CONTROL DE CVASEBCS
                            </div>
                            <img src="../images/congresoLogo.png" alt="" className='w-[5.2vw] mr-2' />
                        </div>
                    </div>
                    <div className='relative mt-2 bg-emerald-950 rounded-lg'>
                        <div className='relative z-10 py-4'>
                            <div className='text-center text-white w-full text-3xl font-bold underline'>
                                CLITERIOS MAYORES
                            </div>
                            <div className='text-center text-white w-full text-xl font-bold'>
                                1. ENTREGA DE CTA PÚBLICA <span className='text-red-500 underline'>(EN TIEMPO Y FORMA)</span> <br />
                                2. SISTEMA CONTABLE ARMONIZADO
                            </div>
                            <div className='text-center text-white w-full text-xs '>
                                Los criterios Mayores, son elementos de carácter obligatorio por Ley, por lo cual la falta de
                                cumplimiento de estos da como resultado la no aprobación de una Cuenta Pública.
                            </div>
                        </div>
                    </div>
                    <div className={`flex py-2 ${isVisible ? '' : 'hidden'}`}>
                        <div className="bg-emerald-950 text-white p-4 rounded-lg shadow-lg">
                            <div className="text-xl font-bold text-center">VARIABLES DE RIESGO.</div><br />
                            <div className='text-center text-sm pt-2'>Este criterio, pretender analizar el RIESGO del ente, entre 
                            más cercano es la ponderacion a 50 puntos, 
                            menor es el riesgo del ente con respecto a 
                            las variables analizadas.</div>
                        </div>
                        <div className="bg-emerald-950 text-white p-4 mx-4 rounded-lg shadow-lg ">
                            <div className="text-xl font-bold text-center">VARIABLES DE CONTROL Y TRANSPARENCIA.</div>
                            <div className='text-center text-sm pt-2'>Este criterio, pretende analizar el nivel de control y transparencia del ente, 
                            con la finalidad de ver el cumplimiento tanto de la LFyRC como de Contabilidad Gubernamental.</div>
                        </div>
                        <div className="bg-emerald-950 text-white p-4 rounded-lg shadow-lg ">
                            <div className="text-xl font-bold text-center">VARIABLES DE RENDICION DE CUENTAS.</div>
                            <div className='text-center text-sm pt-2'>Este criterio, pretender medir el nivel de cumplimiento de las obligaciones de entrega de información en tiempo,
                            entre más cercano a 25 puntos, es mayor el cumplimiento de los tiempos obligados.</div>
                        </div>
                    </div>
                    <button 
                        onClick={toggleVisibility} 
                        className="mt-2 bg-emerald-700 text-white py-2 px-4 rounded-lg shadow-md w-full flex items-center justify-between"
                    >
                        {isVisible ? (
                            <div className='flex mx-auto items-center'>
                                OCULTAR INFORMACIÓN
                                <svg className="h-4 w-4 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>  
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </div>
                        ) : (
                            <div className='flex mx-auto items-center'>
                                INFORMACIÓN EXTRA
                                <svg className="h-4 w-4 text-white font-bold" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>  
                                    <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </div>
                        )}
                    </button>
                </div>
            </>
    );
}
