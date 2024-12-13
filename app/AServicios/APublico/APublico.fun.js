import multer from "multer"
import { v4 } from "uuid"

const almacenamiento_imagenes = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'privado/temporal/imagenes')
    },
    filename: (req, file, cb) => {
        cb(null, `${v4()}-${file.originalname}`)
    }
})

// Filtro para validar tipos de archivo
const filtro_imagenes = (req, file, cb) => {
    const tipos_permitidos = ['image/png', 'image/jpeg', 'image/jpg'];

    if (tipos_permitidos.includes(file.mimetype)) {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error('Solo se permiten archivos PNG o JPG')); // Rechaza el archivo
    }
}

const subida_imagenes = multer({
    storage: almacenamiento_imagenes,
    fileFilter: filtro_imagenes,
    limits: {
        fileSize: 1024 * 1024 * 100 // 100MB
    }
})


export {
    subida_imagenes
}