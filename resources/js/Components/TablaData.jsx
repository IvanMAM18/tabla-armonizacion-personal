import React, { useState } from 'react';
import axios from 'axios';

export default function TablaData() {
    const [selectedFolder, setSelectedFolder] = useState('archivos');
    const [selectedSubfolder, setSelectedSubfolder] = useState('1');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFolderChange = (event) => {
        setSelectedFolder(event.target.value);
    };

    const handleSubfolderChange = (event) => {
        setSelectedSubfolder(event.target.value);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Por favor, selecciona un archivo para subir.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data);
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            alert("Error al subir el archivo.");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <select onChange={handleFolderChange} value={selectedFolder}>
                <option value="archivos">Archivos</option>
                <option value="formatos">Formatos</option>
            </select>
            <select onChange={handleSubfolderChange} value={selectedSubfolder}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
            </select>
            <button onClick={handleUpload}>Subir Archivo</button>
        </div>
    );
}