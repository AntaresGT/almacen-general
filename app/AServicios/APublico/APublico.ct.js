require('dotenv').config()
import { AArchivos, ASeguridad } from "@app/ASTD"
import {
    val_generar_directorio
} from './APublico.val'
import { ARespondedor } from "@app/ARed/ARespondedor"
import path from 'node:path'
class APublicoCt{

    generar_directorio(req, res){
        const cuerpo = ASeguridad.desencriptar_json(req.body)
        const { error } = val_generar_directorio.validate(cuerpo)
        if (error) {
            ARespondedor.responder_peticion_invalida(res, error.message)
            return
        }

        const { nombre } = cuerpo.datos
        AArchivos.crear_carpeta_si_no_existe(`publico/${nombre}`)

        ARespondedor.responder_creado(res, `Carpeta ${nombre} creada correctamente.`)
    }

    /**
     * Está función guarda una imagen en formato png o jpg en la carpeta que se le indique
     * @param {Request} req 
     * @param {Response} res 
     */
    guardar_imagen_png_jpg(req, res){
        const ruta_archivo = req.file.path
        const { guardaren } = req.body
        const nombre_archivo = req.file.filename
        const ruta_destino = path.join(AArchivos.obtener_ruta_publico(), guardaren, nombre_archivo)
        AArchivos.mover_archivo(ruta_archivo, ruta_destino)

        ARespondedor.responder_creado(res, {
            mensaje: "Imagen guardada correctamente",
            ruta: `${req.protocol}://${req.headers.host}${process.env.RUTA_INICIAL}/publico/${guardaren}/${nombre_archivo}`
        })
    }
}

const apublicoct = new APublicoCt()
export {
    apublicoct
}