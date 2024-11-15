import Joi from "joi"

const val_generar_directorio = Joi.object({
    datos: Joi.object({
        nombre: Joi.string().required()
    }).required()
})

export {
    val_generar_directorio
}