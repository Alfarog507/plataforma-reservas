# Arquitectura del Proyecto

## 📦 Frontend

**Framework:** Next.js (App Router)  
**Estilo:** Tailwind CSS  
**Autenticación:** Clerk.dev  
**Deploy:** Vercel

Páginas importantes:

- `/`: landing page
- `/dashboard`: vista del usuario con sus reservas
- `/reservar`: formulario para crear una reserva
- `/perfil`: configuración de cuenta

## 🔧 Backend

**Framework:** NestJS  
**ORM:** Prisma  
**Base de Datos:** PostgreSQL  
**Deploy:** Railway

Módulos:

- `auth`: Validación de usuarios autenticados (via Clerk)
- `users`: Registro y consulta de usuarios
- `bookings`: CRUD de reservas

## 🔒 Seguridad

- Clerk para login seguro
- Validación y sanitización con Zod
- Docker para aislamiento de servicios
