import { Head } from '@inertiajs/react';
import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';
//import FileUpload from "@/Components/FileUpload";

export default function InfoExtraTabla() {

    return (
            <>
                <div className='relative w-11/12 mt-4 mx-auto'>
                    <div className='bg-emerald-700 absolute inset-0 rounded-lg'></div>
                        <div className='p-5 rounded-lg flex justify-between items-center relative z-10'>
                            <img src="../images/UECASELogo.png" alt="" className='w-[5.3vw] ml-2' />
                            <div className='text-center text-black text-sm  px-[5vw]'>
                                <span className='font-bold'>PRESUPUESTO DE PROYECTO PONDERACIÓN PARA LA APROBACIÓN DE CUENTAS PÚBLICAS</span> <br />
                                COMISIÓN DE VIGILANCIA DE LAS ASEBCS <br />
                                UNIDAD DE EVALUACION Y CONTROL DE CVASEBCS
                            </div>
                            <img src="../images/congresoLogo.png" alt="" className='w-[5.2vw] mr-2' />
                        </div>
                    </div>
                    <div className='relative w-11/12 mt-2 mx-auto'>
                        <div className='bg-emerald-950 absolute inset-0 rounded-lg'></div>
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
            </>
    );
}
