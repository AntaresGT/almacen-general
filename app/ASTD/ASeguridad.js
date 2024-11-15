require('dotenv').config()
import CryptoJS from 'crypto-js'
import { alog } from './ALog'

class ASeguridad {

    /**
     * Está función encripta un texto usando AES
     * @param {string} json_encriptar JSON a desencriptar
     * @returns {string}
     */
    static encriptar_json(json_encriptar) {
        if (process.env.MODO == "desarrollo") {
            return json_encriptar
        }

        try {
            return CryptoJS.AES.encrypt(JSON.stringify(json_encriptar), process.env.HASH_ENCRIPTACION_API).toString()
        }
        catch (ex) {
            alog.error(`Error al encriptar texto en ASeguridad.encriptar_json: ${ex.message}`)
            alog.error(`Stack: ${err.stack}`)
        }
    }

    /**
     * Está función desencripta un texto usando AES
     * @param {string} json_desencriptar
     * @returns {Object}
     */
    static desencriptar_json(json_desencriptar) {
        if (process.env.MODO == "desarrollo") {
            return json_desencriptar
        }

        try {
            return JSON.parse(CryptoJS.AES.decrypt(json_desencriptar.objeto, process.env.HASH_ENCRIPTACION_API).toString(CryptoJS.enc.Utf8))
        }
        catch (ex) {
            alog.error(`Error al encriptar texto en ASeguridad.desencriptar_json: ${ex.message}`)
            alog.error(`Stack: ${ex.stack}`)
        }
    }

    /**
     * Está función encripta un texto usando AES
     * @param {string} texto Texto a encriptar
     * @returns {string}
     */
    static encriptar_texto(texto) {
        if (process.env.MODO == "desarrollo") {
            return texto
        }

        try {
            return CryptoJS.AES.encrypt(texto, process.env.HASH_ENCRIPTACION_API).toString()
        }
        catch (ex) {
            alog.error(`Error al encriptar texto en ASeguridad.encriptar_texto: ${ex.message}`)
            alog.error(`Stack: ${ex.stack}`)
        }
    }

    /**
     * Está función desencripta un texto usando AES
     * @param {string} texto Texto a desencriptar
     * @returns {string}
     */
    static desencriptar_texto(texto) {
        if (process.env.MODO == "desarrollo") {
            return texto
        }

        try {
            return CryptoJS.AES.decrypt(texto, process.env.HASH_ENCRIPTACION_API).toString(CryptoJS.enc.Utf8)
        }
        catch (ex) {
            alog.error(`Error al encriptar texto en ASeguridad.desencriptar_texto: ${ex.message}`)
            alog.error(`Stack: ${err.stack}`)
        }
    }

}

export {
    ASeguridad
}