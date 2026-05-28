# 🌸 Artesamía — Sitio Web

Sitio web estático para la tienda artesanal **Artesamía**. Hecho con HTML, CSS puro y JavaScript sin dependencias externas.

## 📁 Estructura del Proyecto

```
artesamia.github.io/
├── index.html
├── pages/
│   ├── catalogo.html
│   ├── faq-contacto.html
│   ├── nosotros.html
│   ├── productos.html
│   └── terminos-y-condiciones.html
├── config/
│   ├── site.config.js
│   └── products.config.js
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── logos/
└── products/
    ├── box-bienvenida/
    ├── caja-vino/
    ├── caja-whisky/
    ├── cuadro-conmemorativo/
    ├── cuadro-super-papa/
    ├── four-pack/
    ├── invitaciones-1/
    ├── invitaciones-2/
    ├── libro-padrinos/
    ├── llavero-recuerdo/
    ├── pack-dia-del-padre-1/
    ├── pack-dia-del-padre-2/
    ├── placa-bienvenida/
    ├── placa-bienvenida-animalitos/
    ├── placa-bienvenida-body/
    ├── porta-celular-papa/
    ├── recuerdo-profesor/
    ├── six-pack/
    ├── tabla-cocina/
    └── velas-baby-shower/
```

---

## ⚙️ Configuración del sitio

### `config/site.config.js`

Ajusta textos, contacto, redes sociales, FAQ y contenido general del sitio.

Ejemplo de contacto:

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

Define cada producto y su contenido.

```js
{
  id: "mi-nuevo-producto",        // Debe coincidir con la carpeta en /products/
  nombre: "Nombre del Producto",
  categoria: "Decoración",
  descripcion: "Descripción...",
  caracteristicas: ["Madera MDF", "Personalizable"],
  precio: "$9.990",
  imagenes: ["foto1.jpg", "foto2.jpg"],
  disponible: true,
  destacado: false,
  tags: ["Navidad", "Regalos"]
},
```

### Agregar imágenes de producto

1. Crea una carpeta dentro de `products/` con el mismo nombre que el `id`.
2. Copia las imágenes dentro de esa carpeta.
3. Actualiza el array `imagenes` en `config/products.config.js`.

Ejemplo:

```text
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

### Editar FAQ

En `config/site.config.js`, actualiza el arreglo `faq`:

```js
faq: [
  {
    pregunta: "¿Tu pregunta?",
    respuesta: "Tu respuesta...",
  },
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

---

*Artesamía © 2026 · San Bernardo, Santiago, Chile*