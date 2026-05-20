# 🌸 Artesamía — Sitio Web

Sitio web estático para la tienda artesanal **Artesamía**. Hecho con HTML, CSS Vanilla y JavaScript puro. Sin dependencias externas, sin frameworks.

## 📁 Estructura del Proyecto

```
Artsamia/
├── index.html              ← Página principal (one-page)
├── site.config.js          ← ⚙️ Config: contacto, redes, textos, FAQ
├── products.config.js      ← ⚙️ Config: catálogo de productos
├── css/
│   └── styles.css          ← Estilos principales
├── js/
│   └── main.js             ← Lógica dinámica
├── assets/
│   └── images/
│       ├── hero-bg.png     ← Imagen hero
│       └── nosotros.png    ← Imagen sección Nosotros
└── products/
    ├── marcos-madera/      ← Carpeta del producto (id)
    │   ├── foto1.png
    │   └── foto2.png
    ├── velas-artesanales/
    ├── souvenirs/
    ├── navidad/
    └── regalos-especiales/
```

---

## ⚙️ Cómo parametrizar el sitio

### 1. Cambiar datos de contacto → `site.config.js`

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

### 2. Agregar un nuevo producto → `products.config.js`

```js
{
  id: "mi-nuevo-producto",        // ← Debe coincidir con nombre de carpeta en /products/
  nombre: "Nombre del Producto",
  categoria: "Decoración",        // Todos / Decoración / Velas / Souvenirs / Regalos
  descripcion: "Descripción...",
  caracteristicas: ["Madera MDF", "Personalizable"],
  precio: "$9.990",
  imagenes: ["foto1.jpg", "foto2.jpg"],   // Archivos en products/mi-nuevo-producto/
  disponible: true,
  destacado: false,
  tags: ["Navidad", "Regalos"]
},
```

### 3. Agregar fotos de un producto

1. Crea una carpeta con el **mismo nombre que el `id`** del producto dentro de `/products/`
2. Copia tus fotos a esa carpeta
3. Actualiza el array `imagenes` en `products.config.js` con los nombres de archivo

Ejemplo:
```
products/
└── mesa-rustica/
    ├── foto-principal.jpg
    ├── detalle.jpg
    └── ambiente.jpg
```

```js
{
  id: "mesa-rustica",
  imagenes: ["foto-principal.jpg", "detalle.jpg", "ambiente.jpg"],
  ...
}
```

### 4. Editar las FAQ → `site.config.js`

```js
faq: [
  {
    pregunta: "¿Tu pregunta?",
    respuesta: "Tu respuesta...",
  },
  // ... más preguntas
],
```

---

## 🚀 Cómo abrir el sitio

Simplemente abre el archivo `index.html` en tu navegador. No requiere servidor.

---

## 🎨 Paleta de Colores

| Color | Uso |
|-------|-----|
| `#FDF8F5` | Fondo principal (crudo/marfil) |
| `#FAF0EB` | Fondo secundario (rosado muy pálido) |
| `#F7DDD6` | Rosado claro |
| `#EDB9AC` | Rosado medio |
| `#D4897A` | Rosado coral (acento principal) |
| `#3D2B26` | Texto oscuro |

---

## 📱 Compatibilidad

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet
- ✅ Móvil (responsive)
- ✅ Swipe en carrusel (táctil)

---

*Artesamía © 2026 · San Bernardo, Santiago, Chile*
