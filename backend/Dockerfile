# Base stage
FROM node:18-alpine AS base

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Development stage
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 3000
# CAMBIO: Usar nodemon en lugar de nest start --watch
CMD ["npm", "run", "start:debug"]

# Build stage
FROM base AS builder
RUN npm ci
COPY . .
# Construir la aplicación NestJS
RUN npm run build

# Production stage
FROM base AS production

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S backend -u 1001

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar build compilado desde builder
COPY --from=builder /app/dist ./dist

# Cambiar ownership
RUN chown -R backend:nodejs /app
USER backend

EXPOSE 3000
# En producción, ejecutar el JavaScript compilado
CMD ["node", "dist/main"]
