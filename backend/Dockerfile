# Multi-stage build para reducir vulnerabilidades
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar todas las dependencias (incluidas dev para build)
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY src ./src

# Construir la aplicación
RUN npm run build

# Imagen de producción
FROM node:18-alpine AS production

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar build desde stage anterior
COPY --from=builder /app/dist ./dist

# Cambiar ownership
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar
CMD ["node", "dist/main.js"]
