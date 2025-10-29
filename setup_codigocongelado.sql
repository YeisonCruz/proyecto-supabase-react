-- Eliminar vistas y tablas previas si existen (para evitar conflictos)
drop view if exists public.v_rentabilidad_producto;
drop view if exists public.v_costo_producto;
drop view if exists public.v_calorias_producto;
drop table if exists public.ventas cascade;
drop table if exists public.producto_ingrediente cascade;
drop table if exists public.productos cascade;
drop table if exists public.ingredientes cascade;
drop table if exists public.users cascade;

-- =============================
-- 1. Usuarios
-- =============================
create table public.users (
  id bigserial primary key,
  nombre text not null,
  correo text unique not null,
  password text not null,
  rol text check (rol in ('admin', 'empleado', 'cliente')) not null default 'cliente'
);

-- =============================
-- 2. Ingredientes
-- =============================
create table public.ingredientes (
  id bigserial primary key,
  nombre text not null,
  precio numeric(10,2) not null,
  calorias integer not null,
  inventario integer not null default 0,
  es_vegetariano boolean not null default false,
  es_sano boolean not null default true,
  tipo text check (tipo in ('base', 'complemento')) not null,
  sabor text
);

-- =============================
-- 3. Productos
-- =============================
create table public.productos (
  id bigserial primary key,
  nombre text not null,
  precio_publico numeric(10,2) not null,
  tipo text check (tipo in ('copa', 'malteada')) not null,
  vaso text,
  volumen_onzas integer
);

-- =============================
-- 4. Relación productos - ingredientes
-- =============================
create table public.producto_ingrediente (
  id bigserial primary key,
  producto_id bigint not null references public.productos(id) on delete cascade,
  ingrediente_id bigint not null references public.ingredientes(id) on delete cascade
);

-- =============================
-- 5. Ventas
-- =============================
create table public.ventas (
  id bigserial primary key,
  producto_id bigint not null references public.productos(id),
  user_id bigint references public.users(id),
  fecha timestamp with time zone default now(),
  cantidad integer not null default 1,
  total numeric(10,2) not null
);

-- =============================
-- 6. Vistas
-- =============================
create or replace view public.v_calorias_producto as
select 
  p.id as producto_id,
  p.nombre,
  sum(i.calorias) as total_calorias
from public.productos p
join public.producto_ingrediente pi on p.id = pi.producto_id
join public.ingredientes i on pi.ingrediente_id = i.id
group by p.id, p.nombre;

create or replace view public.v_costo_producto as
select 
  p.id as producto_id,
  p.nombre,
  sum(i.precio) as costo
from public.productos p
join public.producto_ingrediente pi on p.id = pi.producto_id
join public.ingredientes i on pi.ingrediente_id = i.id
group by p.id, p.nombre;

create or replace view public.v_rentabilidad_producto as
select 
  p.id as producto_id,
  p.nombre,
  p.precio_publico,
  c.costo,
  (p.precio_publico - c.costo) as rentabilidad
from public.productos p
join public.v_costo_producto c on p.id = c.producto_id;

-- =============================
-- 7. Datos iniciales
-- =============================
insert into public.ingredientes 
(nombre, precio, calorias, inventario, es_vegetariano, es_sano, tipo, sabor) 
values 
('Vainilla', 1000, 150, 50, true, true, 'base', 'vainilla'),
('Fresa', 1200, 100, 40, true, true, 'base', 'fresa'),
('Chocolate', 1500, 200, 30, true, true, 'base', 'chocolate'),
('Chispas de Chocolate', 500, 50, 25, true, false, 'complemento', null),
('Crema Batida', 300, 70, 20, true, false, 'complemento', null),
('Sirope de Fresa', 400, 60, 15, true, false, 'complemento', null),
('Oreo', 800, 110, 25, true, false, 'complemento', null);

insert into public.productos 
(nombre, precio_publico, tipo, vaso, volumen_onzas) 
values 
('Copa Vainilla Deluxe', 5000, 'copa', 'mediano', null),
('Copa ChocoFresa', 6000, 'copa', 'grande', null),
('Malteada de Fresa', 7000, 'malteada', null, 16),
('Malteada Oreo', 7500, 'malteada', null, 20);

insert into public.producto_ingrediente (producto_id, ingrediente_id) 
values 
(1, 1), (1, 5), (1, 4),
(2, 3), (2, 2), (2, 6),
(3, 2), (3, 1), (3, 5),
(4, 3), (4, 7), (4, 5);

insert into public.ventas (producto_id, cantidad, total) 
values 
(1, 2, 10000),  
(2, 1, 6000), 
(3, 3, 21000),  
(4, 1, 7500);

insert into public.users (nombre, correo, password, rol)  
values 
('admin', 'admin@admin.co', 'admin', 'admin'),
('empleado', 'empleado@empleado.co', 'empleado', 'empleado'),
('cliente', 'cliente@cliente.co', 'cliente', 'cliente');
