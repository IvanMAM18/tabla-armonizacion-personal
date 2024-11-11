import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        console.log(formData);
        try {
            const response = await axios.post('http://localhost/tabla-armonizacion-personal/public/archivos', formData);
            setFileName(response.data.fileName);
            alert('Archivo subido exitosamente');
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            alert('Error al subir el archivo');
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 border border-slate-600 p-2 rounded"
            />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Subir Archivo
            </button>
            {fileName && (
                <a
                    href={`archivos/${fileName}`}
                    download
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Descargar {fileName}
                </a>
            )}
        </div>
    );
};

export default FileUpload;