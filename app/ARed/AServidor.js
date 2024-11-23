require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import SwaggerJsDoc from 'swagger-jsdoc'
import SwaggerUI from 'swagger-ui-express'
import packageJson from './../../package.json'

import { AArchivos, alog } from '@app/ASTD'

// Interceptores
import basicAuth from 'express-basic-auth'

// Rutas
import { apublicort } from '@app/AServicios/APublico/APublico.rt'

class AServidor {
    constructor(puerto) {
        this.app = express()
        this.puerto = puerto || process.env.PORT || process.env.PUERTO || 3000
        this.ruta_inicial = process.env.RUTA_INICIAL || "/almacen-general"
        this.configurar()
        this.rutas()
    }

    configurar() {
        // Configurar puerto de escucha servidor
        this.app.set(`port`, this.puerto);
        /** Configurar el formato de los logs */
        this.app.use(morgan('dev'))
        /** Configurar accesos de diferentes lugares a la API */
        this.app.use(cors())
        /** Configurar el formato de los datos que se envian por POST */
        this.app.use(express.json({ limit: "500mb" }))
        this.app.use(express.urlencoded({ extended: true }))

        // Crear carpetas privadas
        AArchivos.crear_carpeta_si_no_existe("./privado/")
        // Crear carpeta temporal
        AArchivos.crear_carpeta_si_no_existe("./privado/temporal/")
        // Imagenes temporales
        AArchivos.crear_carpeta_si_no_existe("./privado/temporal/imagenes/")
        // Crear carpetas publicas
        AArchivos.crear_carpeta_si_no_existe("./publico/")

        // Directorio publico
        this.app.use(`${this.ruta_inicial}/publico`, express.static('publico'))

        const usuario_api = {
            [process.env.USUARIO_API]: process.env.CONTRASENA_API
        }

        // Interceptor de autenticación (excluir `/publico`)
        this.app.use((req, res, next) => {
            // Si la ruta empieza con "/publico", omitir autenticación
            if (
                req.path.startsWith(`${this.ruta_inicial}/publico`) ||
                req.path.startsWith(`${this.ruta_inicial}/documentacion`)
            ) {
                return next()
            }
            // Aplicar autenticación básica para otras rutas
            basicAuth({
                users: usuario_api
            })(req, res, next)
        })
    }

    rutas() {
        if (process.env.MODO.toString() == "desarrollo") {
            this.app.use(`${this.ruta_inicial}/documentacion`, SwaggerUI.serve, SwaggerUI.setup(SwaggerJsDoc({
                definition: {
                    openapi: "3.0.0",
                    info: {
                        title: "Almacen general API",
                        version: packageJson.version
                    },
                    servers: [
                        {
                            url: `http://localhost:${this.puerto}${this.ruta_inicial}`
                        }
                    ],
                    components: {
                        securitySchemes: {
                            basicAuth: {
                                type: "http",
                                scheme: "basic"
                            }
                        }
                    },
                    security: [
                        {
                            basicAuth: [] // Se aplica a todas las operaciones por defecto.
                        }
                    ]
                },
                apis: [
                    `./app/AServicios/**/*.rt.js`
                ]
            })));
        }

        // Rutas de la API
        this.app.use(`${this.ruta_inicial}/apublico`, apublicort)
    }

    iniciar() {
        this.app.listen(this.app.get(`port`), () => {
            if (process.env.MODO.toString() == "desarrollo") {
                alog.info(`Documentación en: http://localhost:${this.puerto}${this.ruta_inicial}/documentacion`)
            }

            alog.info(`Servidor escuchando en el puerto ${this.app.get(`port`)}`)
        })
    }
}

export {
    AServidor
}