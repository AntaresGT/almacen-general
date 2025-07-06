# Etapa 1: Construcción y compilación
FROM node:22-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json* ./

# Instalar todas las dependencias (incluidas las de desarrollo)
RUN npm ci

# Copiar el código fuente
COPY . .

# Darle permisos de ejecución al script de compilación
RUN chmod +x ./node_modules/.bin/babel

# Compilar la aplicación usando el script npm definido en package.json
RUN npm run prod

# Etapa 2: Imagen de producción
FROM node:22-alpine AS production

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json* ./

# Instalar solo dependencias de producción
RUN npm i && npm cache clean --force

# Copiar el código compilado desde la etapa de construcción
COPY --from=builder /app/compilado ./compilado

# Cambiar propietario de los archivos al usuario nodejs
RUN chown -R nodejs:nodejs /app

# Cambiar al usuario no-root
USER nodejs

# Exponer el puerto 4501
EXPOSE 4501

# Comando para ejecutar la aplicación
CMD ["node", "compilado/index.js"]
