/**
 * =====================================================
 *  ARTESAMÍA — Catálogo de Productos
 *  Agrega, edita o elimina productos aquí.
 *  Las imágenes deben estar en: products/{id}/
 * =====================================================
 */

const PRODUCTS_CONFIG = [
  {
    id: "marcos-madera",
    nombre: "Marcos de Madera Grabados",
    categoria: "Decoración",
    descripcion: "Marcos decorativos en madera MDF con diseños personalizados grabados con láser de alta precisión. Perfectos para bodas, bautizos, cumpleaños y decoración del hogar.",
    caracteristicas: [
      "Madera MDF premium",
      "Grabado láser personalizable",
      "Diseños exclusivos",
      "Varios tamaños disponibles"
    ],
    precio: "$12.990",
    imagenes: ["foto1.png", "foto2.png"],
    disponible: true,
    destacado: true,
    tags: ["Día de la Madre", "Bodas", "Cumpleaños"]
  },
  {
    id: "velas-artesanales",
    nombre: "Velas Artesanales",
    categoria: "Velas",
    descripcion: "Velas de soya 100% natural con flores secas y etiquetas de madera grabadas. Aromas únicos para crear ambientes especiales en cualquier momento del año.",
    caracteristicas: [
      "Cera de soya natural",
      "Flores secas decorativas",
      "Etiqueta madera grabada",
      "Aromas naturales"
    ],
    precio: "$8.990",
    imagenes: ["foto1.png", "foto2.png"],
    disponible: true,
    destacado: true,
    tags: ["Día de la Madre", "Regalos", "Navidad"]
  },
  {
    id: "souvenirs",
    nombre: "Souvenirs Personalizados",
    categoria: "Souvenirs",
    descripcion: "Llaveros, imanes y mini figuras decorativas con corte y grabado láser. El regalo perfecto para recordar momentos especiales: matrimonios, cumpleaños, baby showers.",
    caracteristicas: [
      "Corte láser de precisión",
      "Madera natural",
      "Diseño personalizado",
      "Ideal para eventos"
    ],
    precio: "$3.990",
    imagenes: ["foto1.png", "foto2.png"],
    disponible: true,
    destacado: false,
    tags: ["Matrimonios", "Baby Shower", "Eventos"]
  },
  {
    id: "navidad",
    nombre: "Adornos Navideños",
    categoria: "Decoración",
    descripcion: "Esferas y adornos navideños en madera MDF con grabado personalizado. Lleva los nombres de toda tu familia al árbol de Navidad con estas piezas únicas y eternas.",
    caracteristicas: [
      "Madera MDF natural",
      "Grabado con nombre personalizado",
      "Diseños navideños exclusivos",
      "Pack familia disponible"
    ],
    precio: "$4.990",
    imagenes: ["foto1.png", "foto2.png"],
    disponible: true,
    destacado: false,
    tags: ["Navidad", "Familia", "Decoración"]
  },
  {
    id: "regalos-especiales",
    nombre: "Gift Box Día Especial",
    categoria: "Regalos",
    descripcion: "Caja regalo premium con productos artesanales seleccionados: marco grabado, vela aromática y tarjeta personalizada. El regalo perfecto para el Día del Padre, la Madre o el Niño.",
    caracteristicas: [
      "Caja de madera grabada",
      "Vela artesanal incluida",
      "Marco personalizado",
      "Tarjeta especial a mano"
    ],
    precio: "$24.990",
    imagenes: ["foto1.png", "foto2.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Día de la Madre", "Navidad", "Cumpleaños"]
  },
];

// Categorías para los filtros (en orden)
const CATEGORIAS = ["Todos", "Decoración", "Velas", "Souvenirs", "Regalos"];

// Hacer disponible en el navegador
if (typeof window !== 'undefined') {
  window.PRODUCTS_CONFIG = PRODUCTS_CONFIG;
  window.CATEGORIAS = CATEGORIAS;
}

// No modificar estas líneas
if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS_CONFIG, CATEGORIAS };
}
