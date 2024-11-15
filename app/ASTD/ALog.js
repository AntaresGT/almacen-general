require('dotenv').config()
import { createLogger, format, transports } from 'winston';
import dayjs from 'dayjs';
import { join } from 'node:path';

// Obtén el entorno actual
const entorno = process.env.MODO || 'dev';

// Genera dinámicamente el nombre del archivo de log basado en la fecha actual con Day.js
const fechaActual = dayjs();
const nombreArchivo = join('logs', `alog-${fechaActual.format('YYYY-MM')}.log`);

// Configura el formato de los logs
const formatoDeLog = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

// Define los transportes para los logs
const transportes = [
    new transports.File({
        filename: nombreArchivo,
        format: formatoDeLog,
    }),
];

// Si estamos en desarrollo, añade logs a la consola
if ((entorno === 'desarrollo') || (entorno === 'testing')) {
    transportes.push(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        })
    );
}

// Crea el logger con los transportes configurados
const alog = createLogger({
    level: 'info', // Nivel de log: puedes usar 'info', 'warn', 'error', etc.
    transports: transportes,
});

export {
    alog
};
