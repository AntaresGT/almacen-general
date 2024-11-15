import { AArchivos, ASeguridad } from "@app/ASTD"
import {
    val_generar_directorio
} from './APublico.val'
import { ARespondedor } from "@app/ARed/ARespondedor"
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

}

const apublicoct = new APublicoCt()
export {
    apublicoct
}