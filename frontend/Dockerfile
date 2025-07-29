# Multi-stage build para reducir vulnerabilidades
FROM node:18-alpine AS base

# Instalar dependencias de seguridad
RUN apk add --no-cache libc6-compat

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Construir la aplicación
FROM base AS builder

# Instalar todas las dependencias (incluidas dev para build)
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . .

# Construir la aplicación de Next.js
RUN npm run build

# Imagen de producción
FROM base AS production

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar build desde stage anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Crear directorio .next/cache con permisos correctos
RUN mkdir -p .next/cache && chown -R nextjs:nodejs /app
USER nextjs

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar Next.js en modo producción
CMD ["npm", "start"]
