require('dotenv').config()
import { AArchivos, alog, ASeguridad } from "@app/ASTD"
import {
    val_generar_directorio_publico
} from './APublico.val'
import { ARespondedor } from "@app/ARed/ARespondedor"
import path from 'node:path'
import { subida_imagenes } from "./APublico.fun"

class APublicoCt {

    generar_directorio_publico(req, res) {
        const cuerpo = ASeguridad.desencriptar_json(req.body)
        const { error } = val_generar_directorio_publico.validate(cuerpo)
        if (error) {
            ARespondedor.responder_peticion_invalida(res, error.message)
            return
        }

        const { nombre } = cuerpo.datos
        const ruta = path.join(AArchivos.obtener_ruta_publico(), nombre)
        AArchivos.crear_carpeta_si_no_existe(ruta)
        ARespondedor.responder_creado(res, `Carpeta ${nombre} creada correctamente.`)
    }

    /**
     * Está función guarda una imagen en formato png o jpg en la carpeta que se le indique
     * @param {Request} req 
     * @param {Response} res 
     */
    guardar_imagen_png_jpg_publico(req, res) {
        const subida = subida_imagenes.single('imagen')
        subida(req, res, (err) => {
            if (err) {
                alog.error(`Error no crítico en APublicoCt.guardar_imagen_png_jpg_publico: ${err.message}`)
                ARespondedor.responder_peticion_invalida(res, { error: err.message })
                return
            }

            try {
                const ruta_archivo = req.file.path
                const { guardaren } = req.body
                const nombre_archivo = req.file.filename
                const ruta_destino = path.join(AArchivos.obtener_ruta_publico(), guardaren, nombre_archivo)
                AArchivos.mover_archivo(ruta_archivo, ruta_destino)
    
                ARespondedor.responder_creado(res, {
                    mensaje: "Imagen guardada correctamente",
                    ruta: `${req.protocol}://${req.headers.host}${process.env.RUTA_INICIAL}/publico/${guardaren}/${nombre_archivo}`
                })
            } catch (ex) {
                alog.error(`Error en APublicoCt.guardar_imagen_png_jpg_publico: ${ex.message}`)
                ARespondedor.responder_error_servidor(res, { error: `Error en APublicoCt.guardar_imagen_png_jpg: ${ex.message}` })
            }
        })
    }
}

const apublicoct = new APublicoCt()
export {
    apublicoct
}