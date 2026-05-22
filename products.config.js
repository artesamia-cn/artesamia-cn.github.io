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
    precio: "Desde $6.000",
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
    precio: "$6.000",
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
    precio: "$15.000",
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
    precioAntes: "$13.000",
    precio: "$11.000",
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
    precioAntes: "$13.000",
    precio: "$11.000",
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
      descripcion2: "🎁 Ideal como regalo de cumpleaños o decoración de habitación infantil.<br>Incluye:",
      caracteristicas: [
        "📸 Espacio para su foto más especial",
        "🧡 Nombre y fecha grabados",
        "🌟 Detalles decorativos llenos de ternura",
        "💬 Frase personalizada"
    ],
    precioAntes: "$13.000",
    precio: "$11.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Oferta", "Bebés", "Regalos"]
  },
  {
    id: "caja-vino",
    nombre: "🍷 Caja de Vino Premium",
    categoria: "Día del Padre",
    descripcion: "✨ Un brindis con estilo para el mejor ejemplo a seguir 💙 En Artesamía creamos regalos únicos hechos con amor para celebrar como se merece",
    descripcion2: "🌟Es el obsequio ideal para sorprenderlo en su día y dejar un recuerdo emotivo que combina elegancia, cariño y utilidad.<br>Incluye:",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad.",
      "🌟 Estructura resistente con la capacidad perfecta para una botella de vino de 750 cc (no incluida)",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales."
    ],
    precio: "$12.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
   {
    id: "six-pack",
    nombre: "🍺 Caja Porta Cervezas x6",
    categoria: "Día del Padre",
    descripcion: "🎉 Este Día del Padre, regálale algo especial ❤️ En Artesamía creamos detalles únicos como esta hermosa caja de madera fabricada en MDF ✨",
    descripcion2: "✨Es el regalo ideal para sorprender a papá en su día o para complementar sus momentos de celebración favoritos.<br>Incluye:",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad.",
      "🌟 Espacio perfecto para 6 botellas de su cerveza favorita (no incluidas).",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales."
    ],
    precio: "$12.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
    {
    id: "four-pack",
    nombre: "🍻 Caja Porta Cervezas x4",
    categoria: "Día del Padre",
    descripcion: "💙 Un detalle original y práctico para homenajear a papá 🌟 En Artesamía creamos regalos únicos hechos con amor para celebrar como se merece ✨",
    descripcion2: "✨Es el obsequio ideal para sorprenderlo en su día y dejar un recuerdo emotivo que usará siempre.<br>Incluye:",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad.",
      "🌟 Espacio perfecto para 4 botellas de su cerveza favorita (no incluidas).",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales."
    ],
    precio: "$12.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Día del Padre", "Regalos"]
  },
  {
    id: "caja-whisky",
    nombre: "🥃 Caja de Whisky Premium",
    categoria: "Día del Padre",
    descripcion: "🎁 ¡El regalo perfecto para papá está aquí! 🥃 En Artesamía creamos recuerdos únicos para sorprender a ese superhéroe sin capa con un detalle elegante ✨",
    descripcion2: "Es el obsequio ideal para celebrar este Día del Padre con un regalo que combina estilo, cariño y buen gusto.<br>Incluye:",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad.",
      "🪵 Caja de madera de MDF de alta calidad, resistente y con un acabado impecable.",
      "🌟 Espacio ideal diseñado para su botella favorita de 750ml (como Jack Daniel’s, no incluida).",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales."
    ],
    precio: "$12.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Día del Padre", "Regalos"]
  },
    {
    id: "porta-celular-papa",
    nombre: "📱 Soporte de Celular con Foto",
    categoria: "Día del Padre",
    descripcion: " Un regalo con emoción y utilidad para este Día del Padre ✨ En Artesamía creamos recuerdos únicos hechos con amor para sorprender a papá en su día. 🌟",
    descripcion2: "Es el detalle ideal para colocar en su escritorio, velador o ese rincón especial, combinando practicidad y sentimiento.<br>Incluye:",
    caracteristicas: [
      "📸 Espacio perfectamente diseñado para colocar una fotografía de 9x13cm (incluida).",
      "⚡ Dedicatoria grabada a láser de alta precisión y nitidez.",
      "🌟 Soporte funcional en MDF resistente, ideal para el uso diario.",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales."
    ],
    precio: "$7.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
];

// Categorías para los filtros (en orden)
const CATEGORIAS = ["Todos", "Día del Padre", "Bebé"];

// Hacer disponible en el navegador
if (typeof window !== 'undefined') {
  window.PRODUCTS_CONFIG = PRODUCTS_CONFIG;
  window.CATEGORIAS = CATEGORIAS;
}

// No modificar estas líneas
if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS_CONFIG, CATEGORIAS };
}
