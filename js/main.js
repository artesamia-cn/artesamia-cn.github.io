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
  initCart();
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
  const sortSelect = document.getElementById('catalogo-sort');

  if (!tabsContainer || !gridContainer) return;

  let categoriaActiva = 'Todos';
  let ordenActual = sortSelect?.value || 'destacados';
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

  sortSelect?.addEventListener('change', (event) => {
    ordenActual = event.target.value;
    renderProductos();
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

  function getPriceValue(product) {
    const priceText = String(product?.precio || '');
    const digits = priceText.match(/[\d.]+/g);
    if (!digits) {
      return 0;
    }

    const normalized = digits.join('').replace(/\./g, '');
    return Number(normalized) || 0;
  }

  function getProductsOrdenados(lista) {
    const orden = lista.slice();

    if (ordenActual === 'precio-asc') {
      return orden.sort((a, b) => getPriceValue(a) - getPriceValue(b) || products.indexOf(a) - products.indexOf(b));
    }

    if (ordenActual === 'precio-desc') {
      return orden.sort((a, b) => getPriceValue(b) - getPriceValue(a) || products.indexOf(a) - products.indexOf(b));
    }

    return orden.sort((a, b) => Number(Boolean(b.destacado)) - Number(Boolean(a.destacado)) || products.indexOf(a) - products.indexOf(b));
  }

  function renderProductos() {
    const filtered = categoriaActiva === 'Todos'
      ? products
      : products.filter(p => productoTieneCategoria(p, categoriaActiva));

    if (filtered.length === 0) {
      gridContainer.innerHTML = '<p class="products-empty">No hay productos en esta categoría aún.</p>';
      return;
    }

    const orderedProducts = getProductsOrdenados(filtered);

    gridContainer.innerHTML = orderedProducts.map(p => buildProductCard(p)).join('');

    // Init carousels after render
    orderedProducts.forEach(p => {
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
    const productPrice = getPriceValue(p);

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
          <div class="product-actions">
            <button type="button" class="btn btn-outline cart-add-btn" data-product-id="${p.id}" data-product-name="${p.nombre}" data-product-price="${productPrice}" data-product-image="${p.imagenes[0]}">
              🛒 Agregar al carro
            </button>
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
   CARRITO — Estático con almacenamiento local
   ══════════════════════════════════════════════════ */
function initCart() {
  const cartPanel = document.getElementById('cart-panel');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartItems = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartWhatsapp = document.getElementById('cart-whatsapp');
  const cartClear = document.getElementById('cart-clear');
  const cartClose = document.getElementById('cart-close');
  const cartOpen = document.getElementById('cart-open');
  const cartOpenMobile = document.getElementById('cart-open-mobile');
  const navCartBadge = document.getElementById('nav-cart-badge');
  const navCartTip = document.getElementById('nav-cart-tip');
  const navCartBadgeMobile = document.getElementById('nav-cart-badge-mobile');
  const navCartTipMobile = document.getElementById('nav-cart-tip-mobile');
  const productsGrid = document.getElementById('productos-grid');

  if (!cartPanel || !cartBackdrop || !cartItems || !cartEmpty || !cartFooter || !cartSubtotal || !cartWhatsapp || !cartClear || !cartClose || !cartOpen || !navCartBadge || !navCartTip) {
    return;
  }

  const STORAGE_KEY = 'artesamia-cart';

  function setMobileCartTipVisible(visible) {
    if (cartOpenMobile) {
      cartOpenMobile.classList.toggle('is-tip-open', visible);
    }
  }

  function openCart() {
    cartPanel.hidden = false;
    cartBackdrop.hidden = false;
    document.body.classList.add('cart-open');
    setMobileCartTipVisible(true);
  }

  function closeCart() {
    cartPanel.hidden = true;
    cartBackdrop.hidden = true;
    document.body.classList.remove('cart-open');
    setMobileCartTipVisible(false);
  }

  function getCart() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  }

  function getCartTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function getTotalItems(cart) {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  function getMessage(cart) {
    const cfg = window.SITE_CONFIG;
    const numero = cfg?.contacto?.whatsapp?.numero || '';
    const lines = cart.map(item => `• ${item.name} x${item.quantity} = ${formatCurrency(item.price * item.quantity)}`);
    const total = formatCurrency(getCartTotal(cart));

    const text = `¡Hola Artesamía! Quiero solicitar este pedido:%0A${lines.join('%0A') }%0A%0ATotal estimado: ${total}`;

    if (!numero) {
      return '#';
    }

    return `https://wa.me/${numero}?text=${text}`;
  }

  function renderCart() {
    const cart = getCart();
    const totalItems = getTotalItems(cart);
    const total = getCartTotal(cart);
    const formattedTotal = formatCurrency(total);

    if (cartCount) {
      cartCount.textContent = String(totalItems);
    }

    if (cartTotal) {
      cartTotal.textContent = formattedTotal;
    }

    cartSubtotal.textContent = formattedTotal;
    navCartBadge.textContent = String(totalItems);
    navCartTip.textContent = totalItems === 0 ? 'Tu carro está vacío' : `Total: ${formattedTotal}`;

    if (navCartBadgeMobile) {
      navCartBadgeMobile.textContent = String(totalItems);
    }

    if (navCartTipMobile) {
      navCartTipMobile.textContent = totalItems === 0 ? 'Tu carro está vacío' : `Total: ${formattedTotal}`;
    }

    if (cartOpenMobile) {
      const isEmpty = totalItems === 0;
      cartOpenMobile.classList.toggle('is-hidden', isEmpty);
      cartOpenMobile.setAttribute('aria-hidden', String(isEmpty));
    }

    if (cart.length === 0) {
      cartEmpty.hidden = false;
      cartItems.innerHTML = '';
      cartFooter.hidden = true;
      return;
    }

    cartEmpty.hidden = true;
    cartFooter.hidden = false;
    cartWhatsapp.href = getMessage(cart);

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item" data-cart-id="${item.id}">
        <div class="cart-item-image">
          <img src="products/${item.id}/${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='assets/images/placeholder.png'">
        </div>
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">${formatCurrency(item.price)}</p>
        </div>
        <div class="cart-item-actions">
          <button type="button" class="cart-qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Disminuir cantidad">−</button>
          <span>${item.quantity}</span>
          <button type="button" class="cart-qty-btn" data-action="increase" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
        </div>
        <div class="cart-item-subtotal">${formatCurrency(item.price * item.quantity)}</div>
        <button type="button" class="cart-remove-btn" data-action="remove" data-id="${item.id}" aria-label="Quitar del carro">❌</button>
      </div>
    `).join('');
  }

  function addItem(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart(cart);
    renderCart();
  }

  function updateItem(id, delta) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);

    if (!existing) {
      return;
    }

    existing.quantity += delta;

    if (existing.quantity <= 0) {
      const filtered = cart.filter(item => item.id !== id);
      saveCart(filtered);
      renderCart();
      return;
    }

    saveCart(cart);
    renderCart();
  }

  function removeItem(id) {
    saveCart(getCart().filter(item => item.id !== id));
    renderCart();
  }

  if (productsGrid) {
    productsGrid.addEventListener('click', (event) => {
      const button = event.target.closest('.cart-add-btn');
      if (!button) return;

      addItem({
        id: button.dataset.productId,
        name: button.dataset.productName,
        price: Number(button.dataset.productPrice),
        image: button.dataset.productImage
      });
    });
  }

  cartItems.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;

    if (action === 'increase') {
      updateItem(id, 1);
    }

    if (action === 'decrease') {
      updateItem(id, -1);
    }

    if (action === 'remove') {
      removeItem(id);
    }
  });

  cartClear.addEventListener('click', () => {
    saveCart([]);
    renderCart();
  });

  cartOpen.addEventListener('click', openCart);
  if (cartOpenMobile) {
    cartOpenMobile.addEventListener('click', openCart);
  }
  cartClose.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !cartPanel.hidden) {
      closeCart();
    }
  });

  renderCart();
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
