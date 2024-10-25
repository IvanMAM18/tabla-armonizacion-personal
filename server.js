import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors());

// Configuración de Multer para guardar archivos en la carpeta public/archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('public', 'archivos'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'Archivo subido exitosamente', fileName: req.file.originalname });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});