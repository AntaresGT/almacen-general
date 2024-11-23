import { Router } from "express"
import { apublicoct } from "./APublico.ct"
import { subida_imagenes } from "./APublico.fun"
/**
 * @swagger
 * components:
 *  schemas:
 *      generar_directorio:
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
         * /apublico/generar-directorio:
         *  post:
         *      tags: [APublico]
         *      summary: Genera un directorio
         *      description: Genera un directorio si no existe
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/generar_directorio'
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
        this.router.post("/generar-directorio", apublicoct.generar_directorio)
        /**
         * @swagger
         * /apublico/guardar-imagen-png-jpg:
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
        this.router.post("/guardar-imagen-png-jpg", subida_imagenes.single('imagen'), apublicoct.guardar_imagen_png_jpg)
    }
}

const apublicort = new APublicoRt().router

export {
    apublicort
}