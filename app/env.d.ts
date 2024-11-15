// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      /** Ambiente  */
      MODO: 'desarrollo' | 'testing' | 'produccion';
      /** Ruta del API */
      RUTA_INICIAL: string;
      /** Usuario del API */
      USUARIO_API: string;
      /** Contraseña del API */
      CONTRASENA_API: string;
      /** Encriptación del API */
      HASH_ENCRIPTACION_API: string;
    }
  }
  