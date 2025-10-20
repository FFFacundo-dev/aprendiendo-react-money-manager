/****************************************************************************************
 * *
 * SCRIPT DE CONFIGURACIÓN PARA LA BASE DE DATOS 'practice-money-manager'              *
 * *
 * Instrucciones de uso en pgAdmin:                                                    *
 * 1. Conéctate a tu servidor local de PostgreSQL.                                     *
 * 2. Haz clic derecho sobre la base de datos 'postgres' (o cualquier otra) y abre    *
 * el 'Query Tool'.                                                                 *
 * 3. Pega TODO el contenido de este archivo en el Query Tool.                         *
 * 4. Ejecuta el script (presionando el ícono del rayo ▶️ o la tecla F5).              *
 * 5. ¡Listo! La base de datos y las tablas estarán creadas y listas para usarse.      *
 * *
 ****************************************************************************************/

-- PASO 1: CREACIÓN DE LA BASE DE DATOS
-- Usamos 'DROP DATABASE' para asegurarnos de empezar desde cero.
-- Si la base de datos ya existe, la borrará y la creará de nuevo.
-- Esto es ideal para un entorno de desarrollo para garantizar un estado limpio.

DROP DATABASE IF EXISTS "practice-money-manager";

CREATE DATABASE "practice-money-manager"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

\c "practice-money-manager"; -- Conectar a la nueva base de datos para crear las tablas dentro de ella.

-- PASO 2: CREACIÓN DE LAS TABLAS

-- TABLA DE USUARIOS (con campo 'role')
-- Almacena la información para el registro, login y permisos.
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    fecha_modificacion TIMESTAMPTZ DEFAULT NOW()
);

-- TABLA DE GASTOS
-- Almacena cada registro de gasto asociado a un usuario.
CREATE TABLE gastos (
    id_gasto SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    monto NUMERIC(10, 2) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    estado VARCHAR(50) NOT NULL DEFAULT 'registrado',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    fecha_modificacion TIMESTAMPTZ DEFAULT NOW(),

    -- Creamos la relación con la tabla de usuarios
    CONSTRAINT fk_usuario
        FOREIGN KEY(id_usuario) 
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE -- Si se borra un usuario, se borran sus gastos.
);

-- PASO 3: MENSAJE DE CONFIRMACIÓN
-- Un simple SELECT para confirmar que el script finalizó.
SELECT '¡Base de datos y tablas creadas exitosamente!' AS resultado;
