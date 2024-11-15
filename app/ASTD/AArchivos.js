import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

class AArchivos {

    /**
     * Está función crea una carpeta si no existe
     * @param {string} ruta
     * @returns {void}
     */
    static crear_carpeta_si_no_existe(ruta) {
        if (!fs.existsSync(ruta)) {
            fs.mkdirSync(ruta)
        }
    }

    /**
     * Obtiene la ruta publica de un archivo
     * @param {string} nombre_archivo Nombre del archivo a guardar
     * @returns {string}
     */
    static obtener_ruta_privado_temp(nombre_archivo) {

        if (os.platform() === "win32") {
            return path.join(__dirname, '../../privado/temporal/', nombre_archivo);
        }

        return path.join(__dirname, '../privado/temporal/', nombre_archivo);
    }

    /**
     * Obtiene la ruta publica de un archivo
     * @returns {string}
     */
    static obtener_ruta_privado_temp_sin_nombre() {
        if (os.platform() === "win32") {
            return path.join(__dirname, '../../privado/temporal');
        }

        return path.join(__dirname, '../privado/temporal');
    }

    /**
     * Obtiene la ruta publica de un archivo
     * @returns {string}
     */
    static obtener_ruta_publico_fotos_usuarios() {
        if (os.platform() === "win32") {
            return path.join(__dirname, '../../publico/fotos-usuarios');
        }

        return path.join(__dirname, '../publico/fotos-usuarios');
    }

    /**
     * Esta función guarda un base64 en un archivo
     * @param {string} ruta 
     * @param {string} base64 
     */
    static guardar_base64_en_archivo(ruta, base64) {
        const base64Data = base64.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(ruta, base64Data, 'base64');
    }
}

export {
    AArchivos
}