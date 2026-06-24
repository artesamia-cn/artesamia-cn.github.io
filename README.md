# Artesamía — Sitio Web

Sitio web estático para la tienda artesanal **Artesamía**. Hecho con HTML, CSS puro y JavaScript sin dependencias externas. Incluye carrito de compras, checkout con MercadoPago y registro de órdenes en Supabase.

## Estructura del Proyecto

```
artesamia-cn.github.io/
├── index.html
├── pages/
│   ├── catalogo.html
│   ├── checkout.html          ← checkout con MercadoPago
│   ├── empresas.html
│   ├── faq-contacto.html
│   ├── nosotros.html
│   ├── nueva-resena.html
│   ├── terminos-y-condiciones.html
│   └── uso-ia.html
├── config/
│   ├── site.config.js         ← textos, contacto, FAQ, redes
│   ├── products.config.js     ← catálogo de productos
│   ├── supabase.config.js     ← credenciales Supabase
│   └── mercadopago.config.js           ← credenciales MercadoPago
├── css/
│   └── styles.css
├── js/
│   ├── main.js                ← navbar, carrito, FAQ, testimonios
│   ├── cart.js                ← helpers de carrito (localStorage)
│   └── checkout.js            ← lógica de checkout y pago
├── assets/
│   ├── images/
│   └── logos/
├── products/                  ← una carpeta por producto
│   ├── box-bienvenida-S/
│   ├── box-bienvenida-M/
│   ├── box-bienvenida-L/
│   ├── caja-vino/
│   ├── caja-whisky/
│   ├── cuadro-conmemorativo/
│   ├── cuadro-super-papa/
│   ├── four-pack/
│   ├── invitaciones-1/
│   ├── invitaciones-2/
│   ├── libro-aniversario/
│   ├── libro-padrinos/
│   ├── llavero-recuerdo/
│   ├── organizador-celular/
│   ├── pack-dia-del-padre-1/
│   ├── pack-dia-del-padre-2/
│   ├── pack-dia-del-padre-3/
│   ├── placa-bienvenida/
│   ├── placa-bienvenida-animalitos/
│   ├── placa-bienvenida-body/
│   ├── placa-bienvenida-colgante/
│   ├── porta-celular-papa/
│   ├── recuerdo-profesor/
│   ├── six-pack/
│   ├── tabla-cocina/
│   └── velas-baby-shower/
├── generate-product-pages.js  ← genera las páginas de producto
└── sitemap.xml
```

---

## Configuración del sitio

### `config/site.config.js`

Ajusta textos, contacto, redes sociales, FAQ y contenido general.

```js
contacto: {
  email: "tu-email@gmail.com",
  whatsapp: {
    numero: "56912345678",    // Sin + ni espacios
    mensajeDefault: "¡Hola! Me interesa un producto.",
  },
  instagram: {
    handle: "@tu_instagram",
    url: "https://www.instagram.com/tu_instagram",
  },
  ubicacion: "Tu ciudad, Chile",
},
```

### `config/products.config.js`

Define cada producto del catálogo.

```js
{
  id: "mi-producto",           // Debe coincidir con la carpeta en /products/
  nombre: "Nombre del Producto",
  categorias: ["Decoración"],
  descripcion: "Descripción...",
  caracteristicas: ["Madera MDF", "Personalizable"],
  precio: "$9.990",
  imagenes: ["foto1.jpg", "foto2.jpg"],
  disponible: true,
  destacado: false,
  tags: ["Navidad", "Regalos"]
},
```

### Agregar un producto nuevo

1. Crea la carpeta `products/<id>/` y copia las imágenes.
2. Agrega la entrada en `config/products.config.js`.
3. Ejecuta `node generate-product-pages.js` para generar el HTML de la página de detalle.
4. Agrega la URL al `sitemap.xml`.

---

## Checkout y Pagos (MercadoPago)

### `config/mercadopago.config.js`

```js
const MERCADOPAGO_CONFIG = {
  ACCESS_TOKEN: 'APP_USR-...',
  PUBLIC_KEY:   'APP_USR-...'
};
```

### Flujo de pago

1. Usuario llena nombre, email y teléfono en `pages/checkout.html`.
2. Se crea una preferencia en MercadoPago vía `POST /checkout/preferences`.
3. Se guarda la orden en Supabase (ver abajo).
4. El usuario es redirigido a `preference.init_point`.
5. Al volver, la URL contiene `?status=success|failure|pending&preference_id=...`.
6. Se actualiza el estado de la orden en Supabase y se llama a la Edge Function `confirmar-pago`.

---

## Base de Datos (Supabase)

### `config/supabase.config.js`

```js
const SUPABASE_CONFIG = {
  API_URL: 'https://<proyecto>.supabase.co/',
  API_KEY: 'sb_publishable_...'
};
```

### Tablas requeridas

```sql
-- Orden principal
create table public.order (
  id            bigserial primary key,
  created_at    timestamptz default now(),
  total_order   integer not null default 0,
  state_order   text not null default 'pending',
  preference_id text
);

-- Detalle del comprador
create table public.detail_order (
  id                    bigserial primary key,
  created_at            timestamptz default now(),
  order_id              bigint references public.order(id),
  customer_name         text not null default '',
  customer_second_name  text not null default '',
  customer_rut          text not null default '',
  customer_mail         varchar not null default '',
  customer_phone        varchar not null default '',
  customer_address_1    text not null default '',
  customer_address_2    text not null default '',
  customer_address_3    text not null default ''
);

-- Productos de la orden
create table public.order_product (
  id                   bigserial primary key,
  created_at           timestamptz default now(),
  order_id             bigint references public.order(id),
  id_product           text not null default '',
  amount               integer not null default 0,
  unit_price           integer not null default 0,
  product_total_amount integer not null default 0,
  detail_1             varchar not null default '',
  detail_2             varchar not null default '',
  detail_3             varchar not null default ''
);
```

### Políticas RLS mínimas

```sql
alter table public.order        enable row level security;
alter table public.detail_order enable row level security;
alter table public.order_product enable row level security;

create policy "anon_insert" on public.order        for insert to anon with check (true);
create policy "anon_insert" on public.detail_order for insert to anon with check (true);
create policy "anon_insert" on public.order_product for insert to anon with check (true);
create policy "anon_update" on public.order        for update to anon using (true);
```

---

## Paleta de Colores

| Color | Uso |
|-------|-----|
| `#FDF8F5` | Fondo principal (crudo/marfil) |
| `#FAF0EB` | Fondo secundario (rosado muy pálido) |
| `#F7DDD6` | Rosado claro |
| `#EDB9AC` | Rosado medio |
| `#D4897A` | Rosado coral (acento principal) |
| `#3D2B26` | Texto oscuro |

---

## Compatibilidad

- Desktop (Chrome, Firefox, Safari, Edge)
- Tablet
- Móvil (responsive)

---

*Artesamía © 2026 · San Bernardo, Santiago, Chile*
