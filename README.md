# Aplicación de Gestión de Tareas Fullstack

Esta es una aplicación completa de gestión de tareas con autenticación de usuarios, construida con Node.js (Express, TypeORM) para el backend y React (Vite, Styled Components, TanStack Query) para el frontend.

## Tabla de Contenidos

- [Prerrequisitos](#prerrequisitos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración del Backend](#configuración-del-backend)
- [Configuración del Frontend](#configuración-del-frontend)
- [Ejecución de la Aplicación](#ejecución-de-la-aplicación)

## Prerrequisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- [Node.js](https://nodejs.org/en/download/) (versión LTS recomendada)
- [npm](https://www.npmjs.com/get-npm) (viene con Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (o acceso a una base de datos PostgreSQL como Neon.tech)

## Estructura del Proyecto

```
task-manager-fullstack/
├── backend/             # API de Node.js (Express, TypeORM)
│   ├── src/
│   │   ├── controllers/
│   │   ├── entities/
│   │   ├── migrations/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tests/
│   │   ├── data-source.ts
│   │   └── index.ts
│   ├── .env             # Variables de entorno (crea este archivo)
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── frontend/            # Aplicación de React (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
└── README.md
```

## Configuración del Backend

1.  **Navega al directorio del backend:**

    ```bash
    cd task-manager-fullstack/backend
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Crea un archivo `.env`:**

    En el directorio `backend/`, crea un archivo llamado `.env` y añade la URL de conexión de tu base de datos y la clave secreta de JWT. Reemplaza los valores de marcador de posición con tu URL de base de datos real y una clave secreta fuerte.

    ```env
    DATABASE_URL="your_postgresql_connection_string_here"
    JWT_SECRET="your_super_secret_jwt_key_here"
    ```

4.  **Ejecuta las migraciones de la base de datos:**

    Esto creará las tablas `users` y `tasks` necesarias en tu base de datos PostgreSQL.

    ```bash
    npm run typeorm migration:run -- -d src/data-source.ts
    ```

5.  **Inicia el servidor de desarrollo del backend:**

    ```bash
    npm run dev
    ```

    La API del backend se ejecutará en `http://localhost:3000`.

## Configuración del Frontend

1.  **Navega al directorio del frontend:**

    ```bash
    cd task-manager-fullstack/frontend
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo del frontend:**

    ```bash
    npm run dev
    ```

    La aplicación frontend se ejecutará típicamente en `http://localhost:5173` (puerto predeterminado de Vite).

## Ejecución de la Aplicación

1.  Asegúrate de que tanto el servidor de desarrollo del backend como el del frontend estén ejecutándose en ventanas de terminal separadas.
2.  Abre tu navegador web y navega a la URL de la aplicación frontend (por ejemplo, `http://localhost:5173`).
3.  Ahora puedes registrar un nuevo usuario, iniciar sesión y comenzar a gestionar tus tareas.