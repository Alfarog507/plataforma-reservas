# Plataforma de Reservas

Una aplicación full stack moderna para gestionar reservas de espacios (coworkings, clínicas, aulas, etc.).

## 🧰 Stack Tecnológico

| Área          | Tecnología                                     |
| ------------- | ---------------------------------------------- |
| Frontend      | Next.js 14 (App Router), Tailwind CSS, Clerk   |
| Backend       | NestJS (Node.js + TypeScript), Prisma ORM      |
| Base de Datos | PostgreSQL                                     |
| DevOps        | Docker, GitHub Actions (CI/CD), Railway/Vercel |
| Autenticación | Clerk.dev                                      |

## 📁 Estructura del Monorepo

```
plataforma-reservas/
├── backend/              # Código fuente de NestJS (API, lógica de negocio)
├── frontend/             # Código fuente de Next.js (UI, páginas, componentes)
├── docker-compose.yml    # Orquestación de servicios (backend, frontend, db)
├── .env-example          # Variables de entorno de ejemplo
├── README.md             # Documentación principal
```

## 🚀 Objetivo

Desarrollar una plataforma que permita:

- Registro/login de usuarios
- Creación de reservas
- Visualización de calendario de reservas
- Panel de administración (en el futuro)

## ✍️ Autor

- Gabriel Alfaro
