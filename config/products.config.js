/**
 * =====================================================
 *  ARTESAMÍA — Catálogo de Productos
 *  Agrega, edita o elimina productos aquí.
 *  Las imágenes deben estar en: products/{id}/
 * =====================================================
 */

const PRODUCTS_CONFIG = [
  {
    id: "caja-vino",
    nombre: "🍷 Caja de Vino Premium",
    categoria: "Día del Padre",
    descripcion: "✨ Un brindis con estilo para el mejor ejemplo a seguir 💙 En Artesamía creamos regalos únicos hechos con amor para celebrar como se merece",
    descripcion2: "🌟Es el obsequio ideal para sorprenderlo en su día y dejar un recuerdo emotivo que combina elegancia, cariño y utilidad.",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad",
      "🌟 Estructura resistente con la capacidad perfecta para una botella de vino de 750 cc (no incluida)",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales"
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
    descripcion2: "✨Es el regalo ideal para sorprender a papá en su día o para complementar sus momentos de celebración favoritos.",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad",
      "🌟 Espacio perfecto para 6 botellas de su cerveza favorita (no incluidas).",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales"
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
    descripcion2: "✨Es el obsequio ideal para sorprenderlo en su día y dejar un recuerdo emotivo que usará siempre.",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad",
      "🌟 Espacio perfecto para 4 botellas de su cerveza favorita (no incluidas)",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales"
    ],
    precio: "$12.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
  {
    id: "caja-whisky",
    nombre: "🥃 Caja de Whisky Premium",
    categoria: "Día del Padre",
    descripcion: "🎁 ¡El regalo perfecto para papá está aquí! 🥃 En Artesamía creamos recuerdos únicos para sorprender a ese superhéroe sin capa con un detalle elegante ✨",
    descripcion2: "Es el obsequio ideal para celebrar este Día del Padre con un regalo que combina estilo, cariño y buen gusto.",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad",
      "🪵 Caja de madera de MDF de alta calidad, resistente y con un acabado impecable",
      "🌟 Espacio ideal diseñado para su botella favorita de 750ml (como Jack Daniel’s, no incluida)",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales"
    ],
    precio: "$12.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
  {
    id: "porta-celular-papa",
    nombre: "📱 Soporte de Celular con Foto",
    categoria: "Día del Padre",
    descripcion: "Un regalo con emoción y utilidad para este Día del Padre ✨ En Artesamía creamos recuerdos únicos hechos con amor para sorprender a papá en su día. 🌟",
    descripcion2: "Es el detalle ideal para colocar en su escritorio, velador o ese rincón especial, combinando practicidad y sentimiento.",
    caracteristicas: [
      "📸 Espacio perfectamente diseñado para colocar una fotografía de 9x13cm (incluida)",
      "⚡ Dedicatoria grabada a láser de alta precisión y nitidez",
      "🌟 Soporte funcional en MDF resistente, ideal para el uso diario",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales"
    ],
    precio: "$8.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
    {
    id: "cuadro-super-papa",
    nombre: "📸 Cuadro Collage Papá",
    categoria: "Día del Padre",
    descripcion: "✨ El recuerdo más emocionante para el mejor papá ❤️",
    descripcion2: "Es el obsequio ideal para sorprenderlo en su día o decorar su oficina, combinando un diseño moderno con un profundo valor sentimental.",
    caracteristicas: [
      "📸 Collage calado exclusivo con tus fotos favoritas detrás (incluidas)",
      "🧡 Toque personal con los nombres de sus hijos o de quien le regala",
      "🌟 Marco de madera natural con un acabado prolijo y listo para exhibir",
      "💬 Totalmente personalizable con la frase o dedicatoria especial que tú elijas para él"
    ],
    precio: "$12.000",
    imagenes: ["image_1.png", "image_2.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
    {
    id: "pack-dia-del-padre-1",
    nombre: "🍻 Set Cervecero Premium",
    categoria: "Día del Padre",
    descripcion: "✨ El regalo perfecto para celebrar al rey de la casa 👨‍👦",
    descripcion2: "Es el obsequio ideal para sus momentos de relajo, combinando diseño rústico, utilidad y todo el cariño que él se merece.",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad",
      "🌟 Espacio perfecto para 6 botellas de su cerveza favorita (no incluidas)",
      "🪵 Destapador fabricado en madera sólida con herraje metálico resistente",
      "🍺 Set de posavasos (6) de madera con grabados detallados",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales"
    ],
    precio: "$20.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
     {
    id: "pack-dia-del-padre-2",
    nombre: "🍷 Set Vino Premium",
    categoria: "Día del Padre",
    descripcion: "✨ Un brindis con estilo para el mejor ejemplo a seguir 💙",
    descripcion2: "Es el obsequio ideal para sus momentos de relajo, combinando diseño rústico, utilidad y todo el cariño que él se merece.",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad",
      "🌟 Estructura resistente con la capacidad perfecta para una botella de vino de 750 cc (no incluida)",
      "🍷 Set de posavasos (4) de madera con grabados detallados",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales"
    ],
    precio: "$15.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
       {
    id: "pack-dia-del-padre-3",
    nombre: "🔥 Set Parrillero Premium",
    categoria: "Día del Padre",
    descripcion: "🍺 ¡El rito del fin de semana se respeta y se mejora! 🔪🥩",
    descripcion2: "Si tu papá no perdona el asadito y quieres coronarte con el mejor regalo para tu viejo, este pack parrillero y cervecero es lo que necesitas. 🪵✨",
    caracteristicas: [
      "⚡ Hechos artesanalmente con grabado láser de alta precisión",
      "🍻 Estructura de madera firme con asa para trasladar tus botellas con estilo (no incluidas)",
      "🪵 Base de madera con destapador metálico, ideal para colgarlo cerca del quincho.",
	  "💨 El infaltable chileno para revivir las brasas sin quemarte las pestañas",
      "💬 Opción de personalizar con nombres, frases o dedicatorias especiales"
    ],
    precio: "$24.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
  {
    id: "tabla-cocina",
    nombre: "🔪🥩 Tabla Asado / Gourmet Personalizada",
    categoria: "Día del Padre",
    descripcion: "🔥 El ingrediente secreto para los mejores momentos con papá 👨‍🍳",
    descripcion2: "Es el regalo ideal para sus asados de domingo o para lucirse en la cocina, combinando un diseño rústico, gran utilidad y un valor sentimental único.",
    caracteristicas: [
      "⚡ Grabado a láser con acabados de calidad",
      "🪵 Fabricada en madera resistente, con vetas naturales, canal de goteo para jugos y mango ergonómico",
      "🌟 Un producto práctico, duradero y con un acabado prolijo que seguro querrá estrenar de inmediato",
      "💬 Espacio para personalización extra con su nombre, una fecha o tu propia dedicatoria"
    ],
    precio: "$12.000",
    imagenes: ["image_1.png", "image_2.png"],
    disponible: true,
    destacado: true,
    tags: ["Día del Padre", "Regalos"]
  },
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
    precio: "Desde $7.000",
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
    precio: "$7.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: true,
    tags: ["Baby Shower", "Bebés"]
  },
    {
    id: "libro-padrinos",
    nombre: "✨ Libro Padrinos",
    categoria: "Bebé",
    categorias: ["Bebé", "Eventos"],
    descripcion: "🧚‍♂️✨ ¿Y si les preguntamos de una forma mágica...? Este libro no es solo un regalo… ¡es una gran pregunta! 💛",
    descripcion2: "Ideal para crear un momento inolvidable 🫶",
    caracteristicas: [
      "🪵 Tapas de madera natural grabadas con precisión láser",
	  "📒 Encuadernación artesanal con ecocuero",
	  "💬 Nombres, fechas y el mensaje interior personalizable a tu historia"
    ],
    precio: "$16.000",
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
    descripcion2: "🎁 Perfecta para decorar la habitación del bebé o regalar en su llegada 💛",
    caracteristicas: [
      "🍼 Nombre en relieve",
      "📅 Fecha de nacimiento",
      "⏰ Hora, peso y medida",
      "🧸 Decoración con animalitos"
    ],
    precio: "$12.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Oferta", "Nacimiento", "Bebés", "Regalos"]
  },
     {
    id: "placa-bienvenida-colgante",
    nombre: "🐘 Placa de Bienvenida",
    categoria: "Bebé",
    descripcion: "🐘🦒🐻 <br> En Artesamía creamos recuerdos únicos como esta hermosa placa de nacimiento para regalar✨",
    descripcion2: "🎁 Perfecta para decorar la habitación del bebé o regalar previo a su llegada 💛",
    caracteristicas: [
      "🍼 Nombre en relieve",
      "📅 Espacio parea incluir fecha de nacimiento",
      "⏰ Espacio para incluir hora, peso y medida de nacimiento",
      "🧸 Decoración con animalitos"
    ],
    precio: "$14.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Oferta", "Nacimiento", "Bebés", "Regalos", "Baby Shower"]
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
    precio: "$12.000",
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
      descripcion2: "🎁 Ideal como regalo de cumpleaños o decoración de habitación infantil.",
      caracteristicas: [
        "📸 Espacio para su foto más especial",
        "🧡 Nombre y fecha grabados",
        "🌟 Detalles decorativos llenos de ternura",
        "💬 Frase personalizada"
    ],
    precio: "$12.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Oferta", "Bebés", "Regalos"]
  },
  {
    id: "invitaciones-1",
    nombre: "💌 Invitaciones de Madera Premium",
    categoria: "Eventos",
    descripcion: "✨ Invitaciones que enamoran desde el primer momento 💌 ✨",
    descripcion2: "Es la opción ideal para matrimonios, bautizos o cualquier ocasión especial.",
    caracteristicas: [
      "💐 Diseños rústicos y delicados con un acabado prolijo de alta calidad",
      "⚡ Nombres, fechas y tipografías grabados a láser según tus preferencias",
      "🌟 Estructura en madera resistente, ideal para que tus invitados la guarden como recuerdo eterno",
      "💬 Un producto totalmente personalizable que se adapta a la temática y paleta de colores de tu evento"
    ],
    precio: "Desde $2.500",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Invitaciones", "Matrimonios", "Bautizos", "Baby Showers"]
  },
  {
    id: "invitaciones-2",
    nombre: "📸 Portarretratos Personalizados",
    categoria: "Eventos",
    descripcion: "💖 Haz que cada momento especial sea inolvidable con recuerdos únicos para bautizos, cumpleaños, baby showers y más. 🌟",
    descripcion2: "Es el souvenir ideal para regalar a tus invitados y dejar un detalle emotivo que combina diseño, cariño y utilidad en su día a día.",
    caracteristicas: [
      "📸 Fotografía impresa de alta calidad ya incorporada en el recuerdo",
      "⚡ Nombres, fechas y tipografías grabados a láser según tus preferencias",
      "🧲 Sistema magnético integrado en MDF resistente, perfecto para lucir en el refrigerador",
      "💬 Un detalle tierno, original y pensado detalladamente para sorprender a quienes más quieres"
    ],
    precio: "Desde $2.500",
    imagenes: ["image_1.png", "image_2.png"],
    disponible: true,
    destacado: false,
    tags: ["Regalos", "Matrimonios", "Bautizos", "Baby Showers"]
  },
  {
    id: "velas-baby-shower",
    nombre: "🕯️ Velas Aromáticas para Baby Shower",
    categoria: "Eventos",
    descripcion: "👶💛 Celebra la llegada del bebé con un recuerdo único con detalles llenos de ternura para que tu baby shower sea un momento inolvidable. ✨",
    descripcion2: "Es el souvenir ideal para regalar a tus invitados, dejando un recuerdo delicado que combina aroma, cariño y utilidad.",
    caracteristicas: [
      "🏷️ Nombre del bebé y la fecha de tu evento impresos con alta nitidez",
      "🪻 Velas aromáticas de alta calidad con fragancias suaves y reconfortantes",
      "💬 Dedicatoria o frase especial totalmente personalizada para sorprender a tus seres queridos"
    ],
    precio: "Desde $2.800",
    imagenes: ["image_1.png", "image_2.png", "image_3.png"],
    disponible: true,
    destacado: true,
    tags: ["Regalos", "Baby Showers"]
  },
    {
    id: "libro-aniversario",
    nombre: "📒 Libro de Aniversario de Matrimonio",
    categoria: "Eventos",
    descripcion: "❤️ ¡El amor se celebra en cada detalle! ✨",
    descripcion2: "Es el regalo ideal para conmemorar matrimonios o cualquier fecha que haya marcado sus vidas. 💍✨",
    caracteristicas: [
      "🎁 No es solo un regalo, es una pieza de decoración para el hogar",
      "🪵 Acabados de madera limpios con encuadernación rústica de cuerda",
      "❤️ Nombres, fechas clave y un mensaje único desde el corazón",
    ],
    precio: "$18.000",
    imagenes: ["image_1.png", "image_2.png"],
    disponible: true,
    destacado: false,
    tags: ["Regalos", "Recuerdo", "Aniversarios"]
  },
  {
    id: "llavero-recuerdo",
    nombre: "🔑 Llaveros de Madera Personalizados",
    categoria: "Eventos",
    descripcion: "✨ ¡Un detalle único para regalar o regalarte!",
    descripcion2: "Es el regalo ideal para agradecimientos, fechas importantes o simplemente como un recordatorio diario lleno de significado.",
    caracteristicas: [
      "🎁 Bolsita de lino",
      "🪵 Fabricados en madera de alta calidad con acabados suaves y argolla reforzada",
      "⚡ El nombre, fecha o esa frase especial que tú elijas grabados a láser",
      "💬 Un detalle práctico, compacto y con un toque natural que a todos les encanta recibir"
    ],
    precio: "Desde $1.400",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Regalos", "Recuerdo"]
  },
  {
    id: "recuerdo-profesor",
    nombre: "🎀 Reconocimiento para Profesores",
    categoria: "Eventos",
    descripcion: "✨ Un detalle único que marca la diferencia para homenajear a quienes dejan huella con su enseñanza. 🌟",
    descripcion2: "Es el reconocimiento ideal para regalar como un agradecimiento especial para ese profesor o profesora inolvidable.",
    caracteristicas: [
      "🪵 Fabricado en madera de MDF de alta calidad con acabados prolijos y base estable",
      "⚡ Nombre del profesor o profesora grabado a láser con máxima nitidez",
      "🌟 Diseño moderno perfecto para lucir en su escritorio, sala de clases o estante",
      "💬 Dedicatoria o frase especial totalmente personalizada para expresar todo tu cariño y gratitud"
    ],
    precio: "$7.000",
    imagenes: ["image_1.png"],
    disponible: true,
    destacado: false,
    tags: ["Regalos", "Recuerdo", "Profesor"]
  },
];

// Categorías para los filtros (en orden)
const CATEGORIAS = ["Todos", "Día del Padre", "Bebé", "Eventos"];

// Hacer disponible en el navegador
if (typeof window !== 'undefined') {
  window.PRODUCTS_CONFIG = PRODUCTS_CONFIG;
  window.CATEGORIAS = CATEGORIAS;
}

// No modificar estas líneas
if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS_CONFIG, CATEGORIAS };
}
