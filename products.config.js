/**
 * =====================================================
 *  ARTESAMÍA — Catálogo de Productos
 *  Agrega, edita o elimina productos aquí.
 *  Las imágenes deben estar en: products/{id}/
 * =====================================================
 */

const PRODUCTS_CONFIG = [
    {
    id: "box-bienvenida",
    nombre: "🎁Box de Bienvenida",
    categoria: "Bebé",
    descripcion: "Regala momentos, ternura y recuerdos con nuestras cajitas personalizadas 🍼💖",
    descripcion2: "Arma tu pack con:",
    caracteristicas: [
      "🧸 Mordedor",
      "🐰 Sonajero",
      "🍼 Porta chupete",
      "💆‍♀️ Cepillo y peine de madera personalizados",
      "🌿 Placa grabada para brazalete",
      "🎁 Caja rígida personalizada"
    ],
    precio: "Desde $5.000",
    imagenes: ["image_1.png", "image_2.png", "image_3.png", "image_4.png"],
    disponible: true,
    destacado: true,
    tags: ["Baby Shower", "Bebés"]
  },
  {
    id: "placa-bienvenida",
    nombre: "❤️ Placa de Bienvenida",
    categoria: "Bebé",
    descripcion: "Guarda el brazalete de nacimiento de tu bebé en una plaquita única, personalizada con su nombre y hecha con amor 💛",
    descripcion2: "Transforma un momento especial, en algo eterno 🫶",
    caracteristicas: [
      "🪵 Madera grabada con láser",
      "📏 Espacio especial para el brazalete",
      "🎁 Ideal como recuerdo o regalo"
    ],
    precio: "$5.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Baby Shower", "Bebés"]
  },
    {
    id: "libro-padrinos",
    nombre: "✨ Libro Padrinos",
    categoria: "Bebé",
    descripcion: "🧚‍♂️✨ ¿Y si les preguntamos de una forma mágica...? Este libro no es solo un regalo… ¡es una gran pregunta! 💛",
    descripcion2: "Ideal para crear un momento inolvidable 🫶",
    caracteristicas: [
      "🪵 Madera grabada con láser"
    ],
    precio: "$14.000",
    imagenes: ["image_1.png", "image_2.png"],
    disponible: true,
    destacado: false,
    tags: ["Bautizo", "Bebés"]
  },
   {
    id: "placa-bienvenida-animalitos",
    nombre: "🌿 Placa de Bienvenida",
    categoria: "Bebé",
    descripcion: "🐘🦒🐻 <br> En Artesamía creamos recuerdos únicos como esta hermosa placa de nacimiento redonda personalizada ✨",
    descripcion2: "🎁 Perfecta para decorar la habitación del bebé o regalar en su llegada 💛 <br>Incluye:",
    caracteristicas: [
      "🍼 Nombre en relieve",
      "📅 Fecha de nacimiento",
      "⏰ Hora, peso y medida",
      "🧸 Decoración con animalitos"
    ],
    precioAntes: "$12.000",
    precio: "$10.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Oferta", "Nacimiento", "Bebés", "Regalos"]
  },
   {
    id: "placa-bienvenida-body",
    nombre: "❤️ Placa de Bienvenida Body",
    categoria: "Bebé",
    descripcion: "💛 En Artesamía celebramos cada llegada con amor 💛",
    descripcion2: "Sorprende a la familia con una placa de nacimiento personalizada como esta 🍼✨",
    caracteristicas: [
      "🍼 Nombre en relieve",
      "📅 Fecha de nacimiento",
      "⏰ Hora, peso y medida",
      "🧸 Decoración personalizada"
    ],
    precioAntes: "$12.000",
    precio: "$10.000",
    imagenes: ["image_1.png", "image_2.png"],
    disponible: true,
    destacado: false,
    tags: ["Oferta", "Nacimiento", "Bebés", "Regalos"]
  },
     {
    id: "cuadro-conmemorativo",
    nombre: "📸 Cuadro Conmemorativo",
    categoria: "Bebé",
    descripcion: "🍼 Un año de vida, mil historias que contar 💛En Artesamía creamos recuerdos únicos como este hermoso marco en madera personalizado ✨",
    descripcion2: "🎁 Ideal como regalo de cumpleaños o decoración de habitación infantil<br>Incluye:",
    caracteristicas: [
      "📸 Espacio para su foto más especial",
      "🧡 Nombre y fecha grabados",
      "🌟 Detalles decorativos llenos de ternura",
      "💬 Frase personalizada"
    ],
    precioAntes: "$12.000",
    precio: "$10.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Oferta", "Bebés", "Regalos"]
  },
];

// Categorías para los filtros (en orden)
const CATEGORIAS = ["Todos", "Bebé", "Decoración", "Velas", "Souvenirs", "Regalos"];

// Hacer disponible en el navegador
if (typeof window !== 'undefined') {
  window.PRODUCTS_CONFIG = PRODUCTS_CONFIG;
  window.CATEGORIAS = CATEGORIAS;
}

// No modificar estas líneas
if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS_CONFIG, CATEGORIAS };
}
