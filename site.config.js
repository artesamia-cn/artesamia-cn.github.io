/**
 * =====================================================
 *  ARTESAMÍA — Configuración del Sitio
 *  Edita este archivo para actualizar la información
 *  de contacto, redes sociales y contenido del sitio.
 * =====================================================
 */

const SITE_CONFIG = {

  // ── Marca ─────────────────────────────────────────
  marca: {
    nombre: "Artesamía",
    tagline: "Detalles que inspiran sonrisas",
    descripcionCorta: "Piezas únicas hechas a mano que combinan tradición y diseño exclusivo.",
    metaDescription: "Descubre Artesamía. Piezas únicas hechas a mano: maderas grabadas con corte láser, velas artesanales, souvenirs y regalos especiales para cada momento. Envíos a todo Chile.",
  },

  // ── Contacto ──────────────────────────────────────
  contacto: {
    email: "artesamia.cn@gmail.com",
    whatsapp: {
      numero: "56945786290",          // Sin + ni espacios
      mensajeDefault: "¡Hola! Vi su sitio web y me interesa uno de sus productos. :)",
    },
    instagram: {
      handle: "@artesamia.cn",
      url: "https://www.instagram.com/artesamia.cn",
    },
    ubicacion: "San Bernardo, Santiago, Chile",
  },

  // ── Quiénes Somos ─────────────────────────────────
  nosotros: {
    titulo: "Nuestra Historia",
    texto: `En <strong>Artesamía</strong>, fusionamos la calidez del trabajo artesanal con el significado de la familia. Nuestro nombre rinde homenaje a nuestras hijas, Sofía y Amanda, quienes inspiran cada una de nuestras creaciones.
    <br><br>
    Especializados en regalos y diseños personalizados para momentos trascendentales —como aniversarios, nacimientos, Día del Padre, Día de la Madre, Navidad y más—, garantizamos piezas únicas de alta calidad donde el detalle y la durabilidad son nuestra firma personal.`,
    valores: [
      { icono: "✍", titulo: "Hecho a Mano", descripcion: "Cada pieza es creada con dedicación y amor artesanal." },
      { icono: "✏️", titulo: "Personalizable", descripcion: "Adaptamos cada diseño a tu historia y estilo único." },
      { icono: "⭐", titulo: "Calidad Premium", descripcion: "Materiales de primera: maderas nobles, velas naturales." },
      { icono: "🚚", titulo: "Envíos a todo Chile", descripcion: "Llevamos tu regalo a cualquier rincón del país." },
    ],
  },

    // ── Productos ─────────────────────────────────
  productos: {
    titulo: "Nuestros Productos",
    valores: [
      { icono: "🪵", imagen: "assets/images/nosotros.png", titulo: "Diseños en Madera", descripcion: "Gracias a la versatilidad de la madera, podemos ofrecer una <strong>gama infinita de acabados</strong>. Ya sea en su tono natural para un estilo minimalista, o intervenido con pinturas de alta calidad, cada creación se adapta totalmente a tu estilo. Es el lienzo perfecto para dar vida a los detalles de bodas, bautizos y dormitorios infantiles." },
      { icono: "🕯️", imagen: "assets/images/gv-p-800.png", titulo: "Momentos Inolvidables", descripcion: "En <strong>Artesamía</strong>, sabemos que hay noticias que se dan una sola vez y celebraciones que se guardan en el alma. Por eso, transformamos las materias primas en mensajera de tus mejores momentos. Desde <strong>invitaciones de matrimonio</strong> que sorprenden por su elegancia y grabado eterno, hasta <strong>velitas de recuerdo para baby showers</strong> que iluminan la llegada de un nuevo amor; cada pieza es cortada y grabada con la precisión del láser y el cariño de nuestra familia." },
      { icono: "🏷️", imagen: "assets/images/et-p-800.png", titulo: "Etiquetas Personalizables", descripcion: "En <strong>Artesamía</strong>, sabemos que los grandes proyectos se definen en los pequeños detalles. Nuestras etiquetas personalizadas de <strong>cuero natural y ecocuero</strong> son el complemento perfecto para darle identidad y profesionalismo a tus creaciones. Ya sea que te dediques al tejido, la costura, la marroquinería o la papelería, una etiqueta grabada con tu logo marca la diferencia entre un producto genérico y una pieza de autor." },
      { icono: "⚡", imagen: "assets/images/va-p-1080.png", titulo: "Grabados", descripcion: "'La diferencia entre un regalo y un recuerdo inolvidable es lo que grabamos en él. Lo que se personaliza tiene la vocación de ser guardado. Un recuerdo con diseño único no termina en la basura; se convierte en parte de la decoración del hogar, en un tesoro que <strong>vence el paso del tiempo</strong>" },
    ],
  },

  // ── FAQ ───────────────────────────────────────────
  faq: [
    {
      pregunta: "¿Cómo puedo hacer un pedido?",
      respuesta: "Puedes hacer tu pedido directamente por WhatsApp o enviándonos un mensaje en Instagram. Haz clic en el botón '¡Lo quiero!' de cualquier producto y te contactamos de inmediato.",
    },
    {
      pregunta: "¿Los productos son personalizables?",
      respuesta: "¡Sí! La mayoría de nuestros productos pueden personalizarse con nombres, fechas, frases especiales y diseños a medida. Cuéntanos tu idea y la hacemos realidad.",
    },
    {
      pregunta: "¿Cuánto demora la entrega?",
      respuesta: "Los tiempos varían según el producto y la personalización. Generalmente entre 3 a 7 días hábiles. Para pedidos urgentes consúltanos y buscamos soluciones.",
    },
    {
      pregunta: "¿Hacen envíos a regiones?",
      respuesta: "Sí, enviamos a todo Chile a través de servicios de courier. El costo de envío se calcula según la comuna de destino y el peso del paquete.",
    },
    {
      pregunta: "¿Qué materiales utilizan?",
      respuesta: "Trabajamos principalmente con maderas MDF y pino de alta calidad, cortadas y grabadas con láser de precisión. También usamos cuero natural, ecocuero y ceras naturales para nuestras velas artesanales.",
    },
    {
      pregunta: "¿Hacen pedidos corporativos?",
      respuesta: "¡Por supuesto! Tenemos experiencia en regalos corporativos y pedidos en cantidad. Contáctanos para cotizar y te ofrecemos precios especiales por volumen.",
    },
  ],

  // ── Textos Hero ───────────────────────────────────
  hero: {
    titulo: "Detalles que\ninspiran sonrisas",
    subtitulo: "Regalos únicos hechos a mano.\nDescubre creaciones artesanales perfectas para regalar o sorprender.",
    ctaTexto: "Ver productos",
    ctaLink: "#productos",
  },
};

// Hacer disponible en el navegador
if (typeof window !== 'undefined') {
  window.SITE_CONFIG = SITE_CONFIG;
}

// No modificar esta línea
if (typeof module !== 'undefined') module.exports = SITE_CONFIG;
