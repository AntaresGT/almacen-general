import { StatusCodes, getReasonPhrase } from "http-status-codes"

/**
 * @class ARespondedor
 * Clase que se encarga de responder a las peticiones de los clientes
 */
class ARespondedor{

    /**
     * Está función responde a una petición con una respuesta 200
     * @param {Response} res Respuesta del servidor
     * @param {Object|string|Array} mensaje Respuesta que se le enviará al cliente
     */
    static responder_ok(res, mensaje){
        const respuesta = {
            hubo_error: false,
            datos: mensaje,
            mensaje: "Petición procesada correctamente.",
            codigo: StatusCodes.OK,
            mensaje_servidor: getReasonPhrase(StatusCodes.OK)
        }

        res.status(StatusCodes.OK).json(respuesta)
    }

    /**
     * Esta función responde a una petición con un error 500
     * @param {Response} res 
     * @param {Object|string|Array} mensaje 
     */
    static responder_error_servidor(res, mensaje){
        const respuesta = {
            hubo_error: true,
            datos: mensaje,
            mensaje: "Error en el servidor.",
            codigo: StatusCodes.INTERNAL_SERVER_ERROR,
            mensaje_servidor: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(respuesta)
    }

    /**
     * Esta función responde a una petición con un error 201
     * @param {Response} res 
     * @param {Object|string|Array} mensaje 
     */
    static responder_creado(res, mensaje){
        const respuesta = {
            hubo_error: false,
            datos: mensaje,
            mensaje: "Petición procesada correctamente.",
            codigo: StatusCodes.CREATED,
            mensaje_servidor: getReasonPhrase(StatusCodes.CREATED)
        }

        res.status(StatusCodes.CREATED).json(respuesta)
    }

    static responder_peticion_invalida(res, mensaje){
        const respuesta = {
            hubo_error: true,
            datos: mensaje,
            mensaje: "Petición inválida.",
            codigo: StatusCodes.BAD_REQUEST,
            mensaje_servidor: getReasonPhrase(StatusCodes.BAD_REQUEST)
        }

        res.status(StatusCodes.BAD_REQUEST).json(respuesta)
    }

    static responder_conflicto_existe(res, mensaje){
        const respuesta = {
            hubo_error: true,
            datos: mensaje,
            mensaje: "El recurso ya existe.",
            codigo: StatusCodes.CONFLICT,
            mensaje_servidor: getReasonPhrase(StatusCodes.CONFLICT)
        }

        res.status(StatusCodes.CONFLICT).json(respuesta)
    }

    static responder_recurso_no_encontrado(res, mensaje){
        const respuesta = {
            hubo_error: true,
            datos: mensaje,
            mensaje: "Recurso no encontrado.",
            codigo: StatusCodes.NOT_FOUND,
            mensaje_servidor: getReasonPhrase(StatusCodes.NOT_FOUND)
        }

        res.status(StatusCodes.NOT_FOUND).json(respuesta)
    }

    static responder_no_autorizado(res, mensaje){
        const respuesta = {
            hubo_error: true,
            datos: mensaje,
            mensaje: "No autorizado.",
            codigo: StatusCodes.UNAUTHORIZED,
            mensaje_servidor: getReasonPhrase(StatusCodes.UNAUTHORIZED)
        }

        res.status(StatusCodes.UNAUTHORIZED).json(respuesta)
    }

    static responder_servicio_no_disponible(res, mensaje){
        const respuesta = {
            hubo_error: true,
            datos: mensaje,
            mensaje: "Servicio no disponible.",
            codigo: StatusCodes.SERVICE_UNAVAILABLE,
            mensaje_servidor: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE)
        }

        res.status(StatusCodes.SERVICE_UNAVAILABLE).json(respuesta)
    }
}

export {
    ARespondedor
}