# Base stage
FROM node:18-alpine AS base

WORKDIR /app

# Instalar dependencias de seguridad
RUN apk add --no-cache libc6-compat

# Copiar archivos de dependencias
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM base AS production

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Instalar dependencias de seguridad
RUN apk add --no-cache libc6-compat

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar build desde stage anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Crear directorio .next/cache con permisos correctos
RUN mkdir -p .next/cache && chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
CMD ["npm", "start"]