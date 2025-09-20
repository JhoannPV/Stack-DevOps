# Etapa de build
FROM node:22.18.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Instala todas las dependencias
RUN npm ci

COPY . .

# Compila TypeScript
RUN npm run build

# Etapa de producción
FROM node:22.18.0-alpine AS production

WORKDIR /app

COPY package*.json ./

# Instala solo dependencias de producción
RUN npm ci --only=production

# Copia los archivos compilados
COPY --from=builder /app/dist ./dist

# Copia la carpeta public para archivos estáticos
COPY --from=builder /app/src/public ./src/public

# Variables de entorno (por defecto) inyectables en build; se pueden sobrescribir en runtime
ARG PORT
ARG JWT_SEED
ARG MONGO_URL
ARG MONGO_DB_NAME
ENV PORT=${PORT} \
    JWT_SEED=${JWT_SEED} \
    MONGO_URL=${MONGO_URL} \
    MONGO_DB_NAME=${MONGO_DB_NAME}

# Expone el puerto 3001
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]