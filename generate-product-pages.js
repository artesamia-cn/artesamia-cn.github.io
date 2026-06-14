/**
 * =====================================================
 * GENERADOR DE PÁGINAS INDIVIDUALES DE PRODUCTOS
 * Crea un index.html para cada producto en /products/{id}/
 * =====================================================
 */

const fs = require('fs');
const path = require('path');

// Cargar configuración de productos y sitio
const { PRODUCTS_CONFIG } = require('./config/products.config.js');
const SITE_CONFIG = require('./config/site.config.js') || {
  nombre: 'Artesamía',
  url: 'https://artesamia.cl',
  contacto: {
    whatsapp: { numero: '56945786290' }
  }
};

/**
 * Genera el Schema JSON-LD para un producto
 */
function generateProductSchema(product) {
  const priceStr = String(product.precio).replace(/[^0-9]/g, '');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.nombre.replace(/^[^a-zA-Z0-9]+/, ''),
    'description': product.descripcion.replace(/[<>]/g, ''),
    'image': product.imagenes.map(img => `${SITE_CONFIG.url}/products/${product.id}/${img}`),
    'sku': product.id,
    'category': product.categoria || 'Regalos Personalizados',
    'brand': {
      '@type': 'Brand',
      'name': SITE_CONFIG.nombre
    },
    'offers': {
      '@type': 'Offer',
      'url': `${SITE_CONFIG.url}/products/${product.id}/`,
      'priceCurrency': 'CLP',
      'price': priceStr || '0',
      'availability': product.disponible 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock'
    }
  };
}

/**
 * Genera el HTML para una página de producto
 */
function generateProductHTML(product) {
  const schema = generateProductSchema(product);
  const cleanName = product.nombre.replace(/^[^a-zA-Z0-9]+/, '');
  const priceStr = String(product.precio).replace(/[^0-9]/g, '');
  const waMsg = `¡Hola! Me interesa el producto "${product.nombre}" (${product.precio}). ¿Tienen disponibilidad? 😊`;
  const waUrl = `https://wa.me/${SITE_CONFIG.contacto.whatsapp.numero}?text=${encodeURIComponent(waMsg)}`;
  
  const categoriasHtml = (product.categoria ? [product.categoria] : [])
    .map(cat => `<span class="product-tag">${cat}</span>`)
    .join('');
  
  const caractsHtml = product.caracteristicas
    .map(c => `<li>${c}</li>`)
    .join('');
  
  const imagesHtml = product.imagenes
    .map((img, i) => `
      <div class="carousel-slide">
        <img src="${img}" alt="${cleanName} - imagen ${i+1}" loading="lazy">
      </div>
    `)
    .join('');

  const hasDesdePrice = /desde/i.test(String(product.precio));
  
  const dotsHtml = product.imagenes.length > 1
    ? product.imagenes.map((_, i) => `
        <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Imagen ${i+1}"></button>
      `).join('')
    : '';
  
  const prevNextHtml = product.imagenes.length > 1 ? `
    <button class="carousel-btn prev" aria-label="Anterior">&#8592;</button>
    <button class="carousel-btn next" aria-label="Siguiente">&#8594;</button>
  ` : '';

  return `<!DOCTYPE html>
<html lang="es-CL">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO -->
  <title>${cleanName} | Artesamía - Regalos Personalizados Hechos a Mano</title>
  <meta name="description" content="${product.descripcion.replace(/[<>]/g, '').substring(0, 160)}" />
  <meta name="keywords" content="${product.nombre}, regalos personalizados, ${product.categoria}, artesanía, madera grabada" />
  <meta property="og:title" content="${cleanName} | Artesamía" />
  <meta property="og:description" content="${product.descripcion.replace(/[<>]/g, '')}" />
  <meta property="og:image" content="${SITE_CONFIG.url}/products/${product.id}/${product.imagenes[0]}"/>
  <meta property="og:url" content="${SITE_CONFIG.url}/products/${product.id}/" />
  <meta property="og:type" content="product" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${cleanName} | Artesamía" />
  <meta name="twitter:description" content="${product.descripcion.replace(/[<>]/g, '')}" />
  <meta name="twitter:image" content="${SITE_CONFIG.url}/products/${product.id}/${product.imagenes[0]}" />
  <meta name="theme-color" content="#D4897A">

  <!-- Canonical -->
  <link rel="canonical" href="${SITE_CONFIG.url}/products/${product.id}/" />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="../../assets/logos/favicon-32x32.png" />

  <!-- CSS -->
  <link rel="stylesheet" href="../../css/styles.css" />

  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
    ${JSON.stringify(schema, null, 2)}
  </script>
</head>

<body>

  <!-- NAVBAR -->
  <nav class="navbar" id="navbar" role="navigation" aria-label="Menú principal">
    <div class="container">
      <a href="../../index.html" class="nav-logo" id="nav-logo">
        <span class="nav-logo-icon">
          <img src="../../assets/logos/logo_birds.png" alt="Artesamía" loading="lazy" />
        </span>
        <span class="nav-logo-name">
          <img src="../../assets/logos/logo_nombre-p-500.png"  loading="lazy"  />
        </span>
      </a>

      <div class="nav-links">
        <a href="../../pages/nosotros.html" class="nav-link">Nosotros</a>
        <a href="../../pages/catalogo.html" class="nav-link">Catálogo</a>
        <a href="../../pages/empresas.html" class="nav-link">Empresas</a>
        <a href="../../pages/faq-contacto.html" class="nav-link">FAQ</a>
        <a href="../../pages/faq-contacto.html" class="nav-link">Contáctanos</a>
        <button type="button" class="nav-cart-btn" id="cart-open" aria-label="Abrir carro">
          <span class="nav-cart-icon">🛒</span>
          <span class="nav-cart-badge" id="nav-cart-badge">0</span>
          <span class="nav-cart-tip" id="nav-cart-tip">Total: $0</span>
        </button>
      </div>

      <div class="nav-mobile-actions">
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Abrir menú" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Nav -->
  <div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Menú móvil">
    <a href="../../pages/nosotros.html" class="nav-link">Nosotros</a>
    <a href="../../pages/catalogo.html" class="nav-link">Catálogo</a>
    <a href="../../pages/empresas.html" class="nav-link">Empresas</a>
    <a href="../../pages/faq-contacto.html" class="nav-link">FAQ</a>
    <a href="../../pages/faq-contacto.html" class="nav-link">Contáctanos</a>
  </div>

  <div class="cart-backdrop" id="cart-backdrop" hidden></div>

  <div class="cart-panel" id="cart-panel" hidden role="dialog" aria-modal="true" aria-labelledby="cart-modal-title">
    <div class="cart-panel-header">
      <h3 id="cart-modal-title">Carro</h3>
      <div class="cart-panel-actions">
        <button type="button" class="cart-panel-close" id="cart-clear">Vaciar carro</button>
        <button type="button" class="cart-panel-close" id="cart-close">Cerrar</button>
      </div>
    </div>

    <div id="cart-empty" class="cart-empty">Aún no agregas productos. Elige uno para comenzar tu pedido.</div>

    <div id="cart-items" class="cart-items" aria-live="polite"></div>

    <div id="cart-footer" class="cart-footer" hidden>
      <div class="cart-footer-row">
        <span>Total por confirmar</span>
        <strong id="cart-subtotal">$0</strong>
      </div>
        <div class="cart-footer-row-include">
            <span>*Impuestos Incluidos</span>
            <br>
            <span>*No incluye costos de envío</span>
        </div>
      <a id="cart-whatsapp" class="btn btn-whatsapp" target="_blank" rel="noopener">Enviar pedido por WhatsApp</a>
    </div>
  </div>

  <main>

    <!-- BREADCRUMB -->
    <section class="section" style="padding: 5rem 0 0 0;">
      <div class="container">
        <nav aria-label="Breadcrumb" style="font-size: 0.9rem;">
          <a href="../../index.html">Inicio</a> / 
          <a href="../../pages/catalogo.html">Catálogo</a> / 
          <strong>${cleanName}</strong>
        </nav>
      </div>
    </section>

    <!-- PRODUCTO DETALLE -->
    <section class="section" aria-labelledby="product-heading" style="padding-top: 10px">
      <div class="container">
        <div class="product-detail-grid">
          
          <!-- GALERÍA -->
          <div class="product-detail-gallery">
            <div class="carousel" id="main-carousel" style="margin-bottom: 1.5rem;">
              ${product.destacado ? '<span class="product-badge-dest">⭐ Destacado</span>' : ''}
              <div class="carousel-track" id="main-track">
                ${imagesHtml}
              </div>
              ${prevNextHtml}
              ${product.imagenes.length > 1 ? '<div class="carousel-dots" id="main-dots">' + dotsHtml + '</div>' : ''}
            </div>
          </div>

          <!-- INFORMACIÓN -->
          <div class="product-detail-info">
            ${categoriasHtml ? '<div class="product-tags" style="margin-bottom: 1rem;">' + categoriasHtml + '</div>' : ''}
            <h3 class="product-nombre" id="product-heading">${product.nombre}</h3>
            <br>
            <p>${product.descripcion}</p>
            <p>${product.descripcion2}</p>

            <!-- CARACTERÍSTICAS -->
            ${product.caracteristicas && product.caracteristicas.length > 0 ? '<div class="product-characteristics"><h3>Detalles:</h3><ul>' + caractsHtml + '</ul></div>' : ''}

            <!-- PRECIO -->
            <div style="margin: 1.5rem 0;">
              <div style="font-size: clamp(1.4rem, 3vw, 1.8rem); font-weight: 700; color: #D4897A;">${product.precio} CLP</div>
              <span class="product-impuestos">Impuestos Incluidos</span>
            </div>

            <!-- ACCIONES -->
            <div class="product-actions-container">
              ${!hasDesdePrice ? `
              <button type="button" class="btn btn-outline cart-add-btn" data-product-id="${product.id}" data-product-name="${product.nombre}" data-product-price="${priceStr}" data-product-image="${product.imagenes[0]}">
                🛒 Agregar al carro
              </button>
              ` : ''}
              <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp">
                ¡Lo quiero!
              </a>
            </div>

            <!-- NOTA DE PERSONALIZACIÓN -->
            <div class="product-personalization-note">
              <p style="margin: 0; font-weight: bold; margin-bottom: 0.25rem;">💬 Personalizable:</p>
              <p style="margin: 0;">Puedes agregar nombres, fechas o dedicatorias especiales. Contáctanos por WhatsApp para más detalles.</p>
            </div>
          </div>

        </div>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">

        <div class="footer-brand">
          <a href="../../index.html" class="nav-logo-brand" aria-label="Inicio">
            <span class="nav-logo-icon">
              <img src="../../assets/logos/logo_birds.png" alt="Artesamía" loading="lazy" />
            </span>
            <span class="nav-logo-name">
              <img src="../../assets/logos/logo_nombre-p-500.png"  loading="lazy"  />
            </span>
          </a>
          <p>Piezas únicas hechas a mano que combinan la calidez artesanal con diseños exclusivos y personalizados.</p>
        </div>

        <div class="footer-col">
          <h4>Navegación</h4>
          <nav class="footer-links">
            <a href="../../index.html">Inicio</a>
            <a href="../../pages/nosotros.html">Nosotros</a>
            <a href="../../pages/catalogo.html">Catálogo</a>
            <a href="../../pages/empresas.html">Empresas</a>
            <a href="../../pages/faq-contacto.html">FAQ</a>
            <a href="../../pages/faq-contacto.html">Contáctanos</a>
            <a href="../../pages/terminos-y-condiciones.html">Términos y Condiciones</a>
            <a href="../../pages/uso-ia.html">Política y Uso de IA</a>
          </nav>
        </div>

        <div class="footer-col">
          <h4>PRODUCTOS</h4>
          <nav class="footer-links">
            <a href="../../pages/catalogo.html">Ver catálogo completo</a>
            <a href="../../pages/empresas.html">Regalos Corporativos</a>
          </nav>
        </div>

        

       </div>

       <div class="footer-payments">
            <span class="nav-logo-payments">
            <img src="../../assets/logos/logo-webpay.svg" alt="Webpay" loading="lazy" />
            <img src="../../assets/logos/logo-mercadopago.svg" alt="MercadoPago" loading="lazy" />
            </span>
            <br>
        </div>

      <div class="footer-bottom">
        <span>&copy; 2026 Artesamía. Todos los derechos reservados.</span>
        <span>Hecho con ❤️ en San Bernardo, Chile</span>
      </div>
    </div>
  </footer>

  <button type="button" class="nav-cart-btn nav-cart-btn-floating" id="cart-open-mobile" aria-label="Abrir carro">
    <span class="nav-cart-icon">🛒</span>
    <span class="nav-cart-badge" id="nav-cart-badge-mobile">0</span>
    <span class="nav-cart-tip" id="nav-cart-tip-mobile">Total: $0</span>
  </button>

  <button class="scroll-top" id="scroll-top" aria-label="Volver al inicio">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  </button>

  <!-- Scripts -->
  <script src="../../config/site.config.js"><\/script>
  <script src="../../config/products.config.js"><\/script>
  <script src="../../js/main.js"><\/script>

  <!-- Carousel específico para esta página -->
  <script>
    (function() {
      const track = document.getElementById('main-track');
      const dots = document.querySelectorAll('#main-dots .carousel-dot');
      let currentIndex = 0;

      function goTo(index) {
        currentIndex = index % ${product.imagenes.length};
        track.style.transform = \`translateX(-\${currentIndex * 100}%)\`;
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }

      document.querySelector('#main-carousel .prev')?.addEventListener('click', () => goTo(currentIndex - 1));
      document.querySelector('#main-carousel .next')?.addEventListener('click', () => goTo(currentIndex + 1));
      dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    })();
  </script>

</body>
</html>`;
}

/**
 * Elimina todos los archivos index.html existentes en /products
 */
function cleanOldProductPages() {
  try {
    const productsDir = path.join(__dirname, 'products');
    
    if (!fs.existsSync(productsDir)) {
      return 0;
    }

    const folders = fs.readdirSync(productsDir, { withFileTypes: true });
    let deleted = 0;

    folders.forEach(folder => {
      if (folder.isDirectory()) {
        const indexPath = path.join(productsDir, folder.name, 'index.html');
        
        if (fs.existsSync(indexPath)) {
          try {
            fs.unlinkSync(indexPath);
            deleted++;
          } catch (err) {
            console.warn(`⚠️  No se pudo eliminar ${indexPath}: ${err.message}`);
          }
        }
      }
    });

    if (deleted > 0) {
      console.log(`🗑️  ${deleted} archivo(s) index.html eliminado(s) previamente\n`);
    }
    
    return deleted;
  } catch (err) {
    console.error(`⚠️  Error al limpiar archivos antiguos: ${err.message}`);
    return 0;
  }
}

/**
 * Función principal: genera todas las páginas de productos
 */
function generateAllProductPages() {
  if (!PRODUCTS_CONFIG || !Array.isArray(PRODUCTS_CONFIG)) {
    console.error('❌ No se pudo cargar PRODUCTS_CONFIG');
    return;
  }

  // Limpiar archivos anteriores antes de generar nuevos
  cleanOldProductPages();

  let created = 0;
  let errors = 0;

  PRODUCTS_CONFIG.forEach(product => {
    try {
      const productDir = path.join(__dirname, 'products', product.id);
      const outputFile = path.join(productDir, 'index.html');

      // Crear directorio si no existe
      if (!fs.existsSync(productDir)) {
        fs.mkdirSync(productDir, { recursive: true });
      }

      // Generar HTML
      const html = generateProductHTML(product);

      // Escribir archivo
      fs.writeFileSync(outputFile, html, 'utf8');
      console.log(`✅ ${product.nombre.substring(0, 30)}... → ${outputFile}`);
      created++;
    } catch (err) {
      console.error(`❌ Error generando ${product.id}: ${err.message}`);
      errors++;
    }
  });

  console.log(`\n📊 Resumen:\n   ✅ ${created} páginas creadas\n   ❌ ${errors} errores`);
}

// Ejecutar
generateAllProductPages();
