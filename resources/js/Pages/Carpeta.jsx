import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Carpeta({ auth , tipo, id }) {

    const numericId = Number(id);
    const [data, setData] = useState([]);

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
                    <div className="w-full text-emerald-950">
                        <div className='bg-emerald-200 h-[20vw] rounded border opacity-60'>
                            <table className='w-full text-left '>
                                <thead className='text-xs bg-white'>
                                    <tr>
                                        <th>NOMBRE DEL ARCHIVO</th>
                                        <th>FECHA DEL ARCHIVO</th>
                                        <th>ACCION</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr className='border-b'>
                                        <td>NOMBRE DEL ARCHIVO</td>
                                        <td>FECHA DEL ARCHIVO</td>
                                        <td>ACCION</td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td>NOMBRE DEL ARCHIVO</td>
                                        <td>FECHA DEL ARCHIVO</td>
                                        <td>ACCION</td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td>NOMBRE DEL ARCHIVO</td>
                                        <td>FECHA DEL ARCHIVO</td>
                                        <td>ACCION</td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td>NOMBRE DEL ARCHIVO</td>
                                        <td>FECHA DEL ARCHIVO</td>
                                        <td>ACCION</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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
    `}</style>
    </>
    );
}
