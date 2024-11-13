import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors());
app.use(express.json()); // Asegúrate de que el servidor pueda parsear JSON

// Configuración de Multer para guardar archivos en la carpeta public/files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Validar el valor de req.body.folder
        const folder = (req.body.folder === 'archivos' || req.body.folder === 'formatos') ? req.body.folder : 'archivos';
        cb(null, path.join('public', 'uploads')); // Usar la carpeta seleccionada
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ 
        message: 'Archivo subido exitosamente', 
        fileName: req.file.originalname,
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});