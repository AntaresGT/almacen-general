import { Router } from "express"
import { apublicoct } from "./APublico.ct"

/**
 * @swagger
 * components:
 *  schemas:
 *      generar_directorio_publico:
 *          type: object
 *          properties:
 *              datos:
 *                  type: object
 *                  properties:
 *                      nombre:
 *                          type: string
 *                          description: Nombre del directorio a crear, si ya existe no hace nada
 *                          example: "fotos"
 */

class APublicoRt {
    constructor() {
        this.router = Router()
        this.configurar()
    }

    configurar() {
        /**
         * @swagger
         * /apublico/generar-directorio-publico:
         *  post:
         *      tags: [APublico]
         *      summary: Genera un directorio público
         *      description: Genera un directorio si no existe en la carpeta pública
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/generar_directorio_publico'
         *      responses:
         *          '200':
         *              description: Petición realizada correctamente
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *          '400':
         *              description: Error en la petición
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *          '401':
         *              description: No autorizado
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *          '500':
         *              description: Error en el servidor
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         */
        this.router.post("/generar-directorio-publico", apublicoct.generar_directorio_publico)
        /**
         * @swagger
         * /apublico/guardar-imagen-png-jpg-publico:
         *  post:
         *      tags: [APublico]
         *      summary: Genera un directorio
         *      description: Genera un directorio si no existe
         *      requestBody:
         *          required: true
         *          content:
         *              multipart/form-data:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          imagen:
         *                              type: string
         *                              format: binary
         *                              description: Imagen a guardar
         *                              required: true
         *                          guardaren:
         *                              type: string
         *                              description: Directorio donde se guardará la imagen
         *                              example: "fotos"
         *                              required: true
         *      responses:
         *          '200':
         *              description: Petición realizada correctamente
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *          '400':
         *              description: Error en la petición
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *          '401':
         *              description: No autorizado
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *          '500':
         *              description: Error en el servidor
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         */
        this.router.post("/guardar-imagen-png-jpg-publico", apublicoct.guardar_imagen_png_jpg_publico)
    }
}

const apublicort = new APublicoRt().router

export {
    apublicort
}