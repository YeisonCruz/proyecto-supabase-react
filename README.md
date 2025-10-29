# Código Congelado

Proyecto frontend en React + Vite que se conecta a Supabase para gestionar una heladería.
Incluye autenticación (registro/login), roles, CRUD de ingredientes y productos, y venta de productos.

## Requisitos
- Node.js v22+
- npm

## Configuración rápida
1. Descomprime el ZIP y entra a la carpeta:
   ```bash
   cd codigocongelado
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Ejecuta localmente:
   ```bash
   npm run dev
   ```

## Supabase
- URL: https://icnvrzgtdkkqcvbojebh.supabase.co
- El archivo `src/lib/supabaseClient.js` ya contiene la `anon` key que me proporcionaste.

Para crear las tablas en tu proyecto Supabase, copia el contenido de `setup_codigocongelado.sql` 
en el SQL Editor de Supabase y ejecútalo (esto creará las tablas y vistas necesarias).

## Notas
- El proyecto viene sin datos de ejemplo.
- Usuarios registrados desde la app se insertan en la tabla `usuarios` con rol `cliente`.
- Las rutas de inventario están protegidas para roles `admin` y `empleado`.
- Ajusta las políticas RLS en Supabase según necesites para producción.
