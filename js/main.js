/**
 * =====================================================
 *  ARTESAMÍA — JavaScript Principal
 *  Lógica dinámica: productos, carrusel, FAQ, nav
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHero();
  initNosotros();
  initProductos();
  initFAQ();
  initContacto();
  initScrollAnimations();
  initScrollTop();
});

 
  
/* ══════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
    });
  });
}

/* ══════════════════════════════════════════════════
   HERO — Populate from config
   ══════════════════════════════════════════════════ */
function initHero() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const el = (id) => document.getElementById(id);

  if (el('hero-titulo')) {
    el('hero-titulo').innerHTML = cfg.hero.titulo.replace('\n', '<br>');
  }
  if (el('hero-subtitulo')) {
    el('hero-subtitulo').innerHTML = cfg.hero.subtitulo.replace('\n', '<br>');
  }
  if (el('hero-cta')) {
    el('hero-cta').textContent = cfg.hero.ctaTexto;
    el('hero-cta').href = cfg.hero.ctaLink;
  }
  if (el('hero-wa')) {
    const waUrl = `https://wa.me/${cfg.contacto.whatsapp.numero}?text=${encodeURIComponent(cfg.contacto.whatsapp.mensajeDefault)}`;
    el('hero-wa').href = waUrl;
  }
}

/* ══════════════════════════════════════════════════
   NOSOTROS — Populate from config
   ══════════════════════════════════════════════════ */
function initNosotros() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const textEl = document.getElementById('nosotros-texto');
  if (textEl) textEl.innerHTML = cfg.nosotros.texto;

  const valoresGrid = document.getElementById('valores-grid');
  if (valoresGrid && cfg.nosotros.valores) {
    valoresGrid.innerHTML = cfg.nosotros.valores.map(v => `
      <div class="valor-card fade-up">
        <div class="valor-icon">${v.icono}</div>
        <h4>${v.titulo}</h4>
        <p>${v.descripcion}</p>
      </div>
    `).join('');
  }
}

/* ══════════════════════════════════════════════════
   PRODUCTOS — Render dinámico + Filtros + Carrusel
   ══════════════════════════════════════════════════ */
function initProductos() {
  const cfg = window.SITE_CONFIG;
  const valoresProductosGrid = document.getElementById('valores-productos-grid');
  if (valoresProductosGrid && cfg.productos.valores) {
    valoresProductosGrid.innerHTML = cfg.productos.valores.map(v => `
      <div class="valor-card fade-up">
        <div class="valor-card-header">
          <div class="valor-icon">${v.icono}</div>
          <h4>${v.titulo}</h4>
        </div>
        <div class="valor-card-body">
          <div class="valor-card-image">
            <img src="${v.imagen}" alt="${v.titulo}" loading="lazy" onerror="this.src='assets/images/placeholder.png'">
          </div>
          <p>${v.descripcion}</p>
        </div>
      </div>
    `).join('');
  }
  const products = window.PRODUCTS_CONFIG;
  const categorias = window.CATEGORIAS;
  if (!products || !categorias) return;

  const tabsContainer = document.getElementById('categorias-tabs');
  const gridContainer = document.getElementById('productos-grid');

  if (!tabsContainer || !gridContainer) return;

  let categoriaActiva = 'Todos';
  const carouselState = {}; // { productId: currentIndex }

  // Render tabs
  tabsContainer.innerHTML = categorias.map(cat => `
    <button class="tab-btn ${cat === 'Todos' ? 'active' : ''}" data-cat="${cat}">
      ${cat}
    </button>
  `).join('');

  // Tab click
  tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      categoriaActiva = btn.dataset.cat;
      renderProductos();
    });
  });

  // Render products
  function getCategoriasProducto(p) {
    if (Array.isArray(p.categorias) && p.categorias.length > 0) {
      return [...new Set(p.categorias.filter(Boolean))];
    }

    if (typeof p.categoria === 'string' && p.categoria.trim()) {
      return [p.categoria.trim()];
    }

    return [];
  }

  function productoTieneCategoria(p, categoria) {
    return getCategoriasProducto(p).includes(categoria);
  }

  function renderProductos() {
    const filtered = categoriaActiva === 'Todos'
      ? products
      : products.filter(p => productoTieneCategoria(p, categoriaActiva));

    if (filtered.length === 0) {
      gridContainer.innerHTML = '<p class="products-empty">No hay productos en esta categoría aún.</p>';
      return;
    }

    gridContainer.innerHTML = filtered.map(p => buildProductCard(p)).join('');

    // Init carousels after render
    filtered.forEach(p => {
      carouselState[p.id] = 0;
      initCarousel(p);
    });

    // Re-trigger scroll animations
    observeElements();
  }

  // Build card HTML
  function buildProductCard(p) {
    const imagesHtml = p.imagenes.map((img, i) => `
      <div class="carousel-slide">
        <img src="products/${p.id}/${img}" alt="${p.nombre} - foto ${i+1}" loading="lazy" onerror="this.src='assets/images/placeholder.png'">
      </div>
    `).join('');

    const dotsHtml = p.imagenes.length > 1
      ? p.imagenes.map((_, i) => `
          <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Imagen ${i+1}"></button>
        `).join('')
      : '';

    const prevNextHtml = p.imagenes.length > 1 ? `
      <button class="carousel-btn prev" data-id="${p.id}" aria-label="Anterior">&#8592;</button>
      <button class="carousel-btn next" data-id="${p.id}" aria-label="Siguiente">&#8594;</button>
    ` : '';

    const tagsHtml = p.tags
      ? p.tags.map(t => `<span class="product-tag">${t}</span>`).join('')
      : '';

    const categoriasHtml = getCategoriasProducto(p)
      .map(cat => `<span class="product-tag">${cat}</span>`)
      .join('');

    const caractsHtml = p.caracteristicas
      .map(c => `<span class="caract-chip">${c}</span>`)
      .join('');

    const cfg = window.SITE_CONFIG;
    const waMsg = `¡Hola! Me interesa el producto "${p.nombre}" (${p.precio}). ¿Tienen disponibilidad? 😊`;
    const waUrl = cfg
      ? `https://wa.me/${cfg.contacto.whatsapp.numero}?text=${encodeURIComponent(waMsg)}`
      : '#';

    return `
      <article class="product-card fade-up" id="card-${p.id}">
        <div class="carousel" id="carousel-${p.id}">
          ${p.destacado ? '<span class="product-badge-dest">⭐ Destacado</span>' : ''}
          <div class="carousel-track" id="track-${p.id}">
            ${imagesHtml}
          </div>
          ${prevNextHtml}
          ${p.imagenes.length > 1 ? `<div class="carousel-dots" id="dots-${p.id}">${dotsHtml}</div>` : ''}
        </div>
        <div class="product-body">
          ${categoriasHtml ? `<div class="product-tags">${categoriasHtml}</div>` : ''}
          <h3 class="product-nombre">${p.nombre}</h3>
          <p class="product-descripcion">${p.descripcion}</p>
          <p class="product-descripcion-2">${p.descripcion2}</p>
          <div class="product-caracteristicas">${caractsHtml}</div>
          ${tagsHtml ? `<div class="product-tags">${tagsHtml}</div>` : ''}
          <div class="product-footer">
            ${p.precioAntes ? `<div class="product-precio-antes">${p.precioAntes}</div>` : ''}
            <span class="product-precio">&nbsp;${p.precio}</span>
          </div>
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ¡Lo quiero!
          </a>
        </div>
      </article>
    `;
  }

  // Init carousel for a product
  function initCarousel(p) {
    if (p.imagenes.length <= 1) return;

    const track = document.getElementById(`track-${p.id}`);
    const dotsEl = document.getElementById(`dots-${p.id}`);
    const card = document.getElementById(`card-${p.id}`);
    if (!track || !card) return;

    carouselState[p.id] = 0;

    function goTo(index) {
      const total = p.imagenes.length;
      carouselState[p.id] = (index + total) % total;
      track.style.transform = `translateX(-${carouselState[p.id] * 100}%)`;
      if (dotsEl) {
        dotsEl.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === carouselState[p.id]);
        });
      }
    }

    // Prev / Next buttons
    card.querySelector('.carousel-btn.prev')?.addEventListener('click', (e) => {
      e.preventDefault();
      goTo(carouselState[p.id] - 1);
    });
    card.querySelector('.carousel-btn.next')?.addEventListener('click', (e) => {
      e.preventDefault();
      goTo(carouselState[p.id] + 1);
    });

    // Dots
    dotsEl?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Touch / swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(carouselState[p.id] + (diff > 0 ? 1 : -1));
      }
    }, { passive: true });
  }

  // Initial render
  renderProductos();
}

/* ══════════════════════════════════════════════════
   FAQ — Acordeón dinámico
   ══════════════════════════════════════════════════ */
function initFAQ() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const listEl = document.getElementById('faq-list');
  const waBtn = document.getElementById('faq-wa-btn');
  const igBtn = document.getElementById('faq-ig-btn');
  const mailBtn = document.getElementById('faq-mail-btn');

  if (!listEl) return;

  // Populate links
  if (waBtn && cfg.contacto.whatsapp) {
    const waUrl = `https://wa.me/${cfg.contacto.whatsapp.numero}?text=${encodeURIComponent(cfg.contacto.whatsapp.mensajeDefault)}`;
    waBtn.href = waUrl;
  }
  if (igBtn && cfg.contacto.instagram) igBtn.href = cfg.contacto.instagram.url;
  if (mailBtn) mailBtn.href = `mailto:${cfg.contacto.email}`;

  // Render FAQ items
  listEl.innerHTML = cfg.faq.map((item, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-question" aria-expanded="false">
        <span>${item.pregunta}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-inner">${item.respuesta}</div>
      </div>
    </div>
  `).join('');

  // Accordion logic
  listEl.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      listEl.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-answer')?.classList.remove('open');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Open this if was closed
      if (!isOpen) {
        item.classList.add('open');
        answer?.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ══════════════════════════════════════════════════
   CONTACTO — Populate links + Form
   ══════════════════════════════════════════════════ */
function initContacto() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  // Populate contact links
  const waLink = document.getElementById('contacto-wa');
  const igLink = document.getElementById('contacto-ig');
  const mailLink = document.getElementById('contacto-mail');
  const waVal = document.getElementById('contacto-wa-val');
  const igVal = document.getElementById('contacto-ig-val');
  const mailVal = document.getElementById('contacto-mail-val');
  const locVal = document.getElementById('contacto-loc-val');

  if (waLink) {
    const waUrl = `https://wa.me/${cfg.contacto.whatsapp.numero}?text=${encodeURIComponent(cfg.contacto.whatsapp.mensajeDefault)}`;
    waLink.href = waUrl;
  }
  if (igLink) igLink.href = cfg.contacto.instagram.url;
  if (mailLink) mailLink.href = `mailto:${cfg.contacto.email}`;
  if (waVal) waVal.textContent = `+${cfg.contacto.whatsapp.numero}`;
  if (igVal) igVal.textContent = cfg.contacto.instagram.handle;
  if (mailVal) mailVal.textContent = cfg.contacto.email;
  if (locVal) locVal.textContent = cfg.contacto.ubicacion;

  // Footer links
  const footerWa = document.getElementById('footer-wa');
  const footerIg = document.getElementById('footer-ig');
  const footerMail = document.getElementById('footer-mail');

  if (footerWa) footerWa.href = `https://wa.me/${cfg.contacto.whatsapp.numero}`;
  if (footerIg) footerIg.href = cfg.contacto.instagram.url;
  if (footerMail) footerMail.href = `mailto:${cfg.contacto.email}`;

  // Contact form
  const form = document.getElementById('contacto-form');
  const successMsg = document.getElementById('form-success');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = form.querySelector('#form-nombre')?.value || '';
    const email = form.querySelector('#form-email')?.value || '';
    const asunto = form.querySelector('#form-asunto')?.value || 'Consulta desde el sitio web';
    const mensaje = form.querySelector('#form-mensaje')?.value || '';

    const body = `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`;
    const mailUrl = `mailto:${cfg.contacto.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailUrl;

    // Show success message
    if (successMsg) {
      successMsg.style.display = 'block';
      form.reset();
      setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
    }
  });
}

/* ══════════════════════════════════════════════════
   SCROLL ANIMATIONS
   ══════════════════════════════════════════════════ */
function initScrollAnimations() {
  observeElements();
}

function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Add staggered delays to grid items
  document.querySelectorAll('.fade-up:not(.visible)').forEach((el, i) => {
    const parent = el.closest('.productos-grid, .valores-grid');
    if (parent) {
      const siblings = [...parent.querySelectorAll('.fade-up')];
      const idx = siblings.indexOf(el);
      el.dataset.delay = idx * 80;
    }
    observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════
   SCROLL TO TOP
   ══════════════════════════════════════════════════ */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
