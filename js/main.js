/**
 * =====================================================
 *  ARTESAMÍA — JavaScript Principal
 *  Lógica dinámica: productos, carrusel, FAQ, nav
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHero();
  initHomePreviews();
  initNosotros();
  initProductos();
  initEmpresas();
  initCart();
  initFAQ();
  initContacto();
  initScrollAnimations();
  initScrollTop();
  initTestimonios();
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
            <img src="${v.imagen}" alt="${v.titulo}" loading="lazy" onerror="this.src='../assets/images/placeholder.png'">
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
  const searchInput = document.getElementById('catalogo-search');
  const filterTextMessage = document.getElementById('filter-text-message');

  if (!tabsContainer || !gridContainer) return;

  let categoriaActiva = 'Todos';
  let ordenActual = sortSelect?.value || 'destacados';
  let searchQuery = '';
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

  searchInput?.addEventListener('input', (event) => {
    searchQuery = String(event.target.value || '').trim().toLowerCase();
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

  function productoCoincideBusqueda(p, query) {
    if (!query) return true;

    const terms = [
      p.nombre,
      p.descripcion,
      p.descripcion2,
      ...(p.tags || []),
      ...getCategoriasProducto(p)
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return terms.includes(query);
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
    const filteredByCategory = categoriaActiva === 'Todos'
      ? products
      : products.filter(p => productoTieneCategoria(p, categoriaActiva));

    const filtered = filteredByCategory.filter(p => productoCoincideBusqueda(p, searchQuery));

    if (filterTextMessage) {
      if (searchQuery && categoriaActiva !== 'Todos') {
        filterTextMessage.textContent = `Resultados para "${searchQuery}" en ${categoriaActiva}: ${filtered.length} producto(s).`;
      } else if (searchQuery) {
        filterTextMessage.textContent = `Resultados para "${searchQuery}": ${filtered.length} producto(s).`;
      } else if (categoriaActiva !== 'Todos') {
        filterTextMessage.textContent = `Filtrando categoría ${categoriaActiva}: ${filtered.length} producto(s).`;
      } else {
        filterTextMessage.textContent = '';
      }
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = '<p class="products-empty">No se encontraron productos para la búsqueda.</p>';
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
        <img src="../products/${p.id}/${img}" alt="${p.nombre} - foto ${i+1}" loading="lazy" onerror="this.src='../assets/images/placeholder.png'">
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
    const isDesdePrice = /desde/i.test(String(p.precio));

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
                  <a href="../products/${p.id}/index.html" aria-label="Ver detalles de ${p.nombre}">

        <div class="product-body">
          ${categoriasHtml ? `<div class="product-tags">${categoriasHtml}</div>` : ''}
          <h3 class="product-nombre">${p.nombre}</h3>
          <div class="product-footer">
            ${p.precioAntes ? `<div class="product-precio-antes">${p.precioAntes}</div>` : ''}
            <span class="product-precio">&nbsp;${p.precio} CLP</span>
            <span class="product-impuestos">Impuestos Incluidos</span>
          </div>    
        </div>
        </a>
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
   HOME PREVIEWS — Muestra hasta 3 productos por categoría
   ══════════════════════════════════════════════════ */
function initHomePreviews() {
  const products = window.PRODUCTS_CONFIG || [];
  const categorias = window.CATEGORIAS || [];
  const container = document.getElementById('home-previews-grid');
  if (!container || !products.length || !categorias.length) return;
  function getCategoriasProducto(p) {
    if (Array.isArray(p.categorias) && p.categorias.length > 0) {
      return [...new Set(p.categorias.filter(Boolean))];
    }
    if (typeof p.categoria === 'string' && p.categoria.trim()) {
      return [p.categoria.trim()];
    }
    return [];
  }

  function getPriceValue(product) {
    const priceText = String(product?.precio || '');
    const digits = priceText.match(/[\d.]+/g);
    if (!digits) return 0;
    const normalized = digits.join('').replace(/\./g, '');
    return Number(normalized) || 0;
  }

  const cats = categorias.filter(c => String(c).toLowerCase() !== 'todos');

  container.innerHTML = cats.map(cat => {
    const items = products.filter(p => getCategoriasProducto(p).includes(cat));
    if (!items.length) return '';

    const sorted = items.slice().sort((a, b) => {
      const fa = a.destacado ? 0 : 1;
      const fb = b.destacado ? 0 : 1;
      if (fa !== fb) return fa - fb;
      return getPriceValue(a) - getPriceValue(b);
    });

    const slice = sorted.slice(0, 3);

    const cardsHtml = slice.map(p => {
      const categoriasHtml = getCategoriasProducto(p)
        .map(cn => `<span class="product-tag">${cn}</span>`)
        .join('');

      const caractsHtml = Array.isArray(p.caracteristicas)
        ? p.caracteristicas.map(c => `<span class="caract-chip">${c}</span>`).join('')
        : '';

      return `
        <article class="product-card preview" id="preview-${p.id}">
          <div class="carousel">
            ${p.destacado ? '<span class="product-badge-dest">⭐ Destacado</span>' : ''}
            <div class="carousel-track">
              <div class="carousel-slide">
                <img src="products/${p.id}/${p.imagenes[0]}" alt="${p.nombre}" loading="lazy" onerror="this.src='assets/images/placeholder.png'">
              </div>
            </div>
          </div>
          <div class="product-body">
            ${categoriasHtml ? `<div class="product-tags">${categoriasHtml}</div>` : ''}
            <h3 class="product-nombre">${p.nombre}</h3>
            <div  style="text-align: right;">
            <a href="pages/catalogo.html" class="btn-preview btn-primary-preview">
              <span>Ver más</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            </a>
            <div>
            <div class="product-footer">
              ${p.precioAntes ? `<div class="product-precio-antes">${p.precioAntes}</div>` : ''}
              <span class="product-precio">${p.precio} CLP</span>
              <span class="product-impuestos">Impuestos Incluidos</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    return `
      <div class="home-preview-category">
        <h3 class="home-preview-cat">${cat}</h3>
        <div class="home-preview-cards">${cardsHtml}</div>
      </div>
    `;
  }).join('');
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
  const cartCheckout = (() => {
    const path = window.location.pathname;
    if (path.includes('checkout')) return null;
    let href;
    if (path.includes('/products/')) href = '../../pages/checkout.html';
    else if (path.includes('/pages/')) href = 'checkout.html';
    else href = 'pages/checkout.html';
    const a = document.createElement('a');
    a.href = href;
    a.className = 'btn btn-primary';
    a.style.cssText = 'width:100%;display:block;text-align:center;margin-top:8px;';
    a.textContent = 'Ir al checkout';
    cartWhatsapp?.insertAdjacentElement('afterend', a);
    return a;
  })();
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
      cartTotal.textContent = formattedTotal + ' CLP';
    }

    cartSubtotal.textContent = formattedTotal + ' CLP';
    navCartBadge.textContent = String(totalItems);
    navCartTip.textContent = totalItems === 0 ? 'Tu carro está vacío' : `Total: ${formattedTotal} CLP`;

    if (navCartBadgeMobile) {
      navCartBadgeMobile.textContent = String(totalItems);
    }

    if (navCartTipMobile) {
      navCartTipMobile.textContent = totalItems === 0 ? 'Tu carro está vacío' : `Total: ${formattedTotal} CLP`;
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

    var productsPath = '../products';
    if (window.location.pathname.includes("index")) {
      productsPath = 'products';
      if (window.location.pathname.includes("products")) {
        productsPath = '../../products';
      }
    }

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item" data-cart-id="${item.id}">
        <div class="cart-item-image">
          <img src="${productsPath}/${item.id}/${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='../assets/images/placeholder.png'">
        </div>
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">Precio Unitario: ${formatCurrency(item.price)} CLP</p>
        </div>
        <div class="cart-item-actions">
          <button type="button" class="cart-qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Disminuir cantidad">−</button>
          <span>${item.quantity}</span>
          <button type="button" class="cart-qty-btn" data-action="increase" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
        </div>
        <div class="cart-item-subtotal">${formatCurrency(item.price * item.quantity)} CLP</div>
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

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.cart-add-btn');
    if (!button) return;

    addItem({
      id: button.dataset.productId,
      name: button.dataset.productName,
      price: Number(button.dataset.productPrice),
      image: button.dataset.productImage
    });
  });

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
   EMPRESAS — Regalos Corporativos
   ══════════════════════════════════════════════════ */
function initEmpresas() {
  const cfg = window.SITE_CONFIG;
  const products = window.PRODUCTS_CONFIG;
  if (!cfg || !cfg.empresas) return;

  const emp = cfg.empresas;

  // Hero
  const titulo = document.getElementById('empresas-titulo');
  const subtitulo = document.getElementById('empresas-subtitulo');
  if (titulo) titulo.innerHTML = emp.hero.titulo.replace('\n', '<br>');
  if (subtitulo) subtitulo.textContent = emp.hero.subtitulo;

  // CTA texts
  const ctaTitulo = document.getElementById('empresas-cta-titulo');
  const ctaSubtitulo = document.getElementById('empresas-cta-subtitulo');
  if (ctaTitulo) ctaTitulo.textContent = emp.cta.titulo;
  if (ctaSubtitulo) ctaSubtitulo.textContent = emp.cta.subtitulo;

  // CTA buttons
  const waBtn = document.getElementById('empresas-wa-btn');
  const mailBtn = document.getElementById('empresas-mail-btn');
  const ctaHeroBtn = document.getElementById('empresas-cta-btn');

  const waUrl = `https://wa.me/${cfg.contacto.whatsapp.numero}?text=${encodeURIComponent(emp.cta.mensajeWhatsapp)}`;
  if (waBtn) waBtn.href = waUrl;
  if (ctaHeroBtn) ctaHeroBtn.href = waUrl;
  if (mailBtn) {
    const asunto = encodeURIComponent('Consulta regalos corporativos - Artesamía');
    mailBtn.href = `mailto:${cfg.contacto.email}?subject=${asunto}`;
  }

  // Beneficios
  const beneficiosGrid = document.getElementById('empresas-beneficios-grid');
  if (beneficiosGrid && emp.beneficios) {
    beneficiosGrid.innerHTML = emp.beneficios.map(b => `
      <div class="valor-card fade-up">
        <div class="valor-icon">${b.icono}</div>
        <h4>${b.titulo}</h4>
        <p>${b.descripcion}</p>
      </div>
    `).join('');
  }

  // Proceso
  const procesoGrid = document.getElementById('empresas-proceso-grid');
  if (procesoGrid && emp.proceso) {
    procesoGrid.innerHTML = emp.proceso.map(p => `
      <div class="proceso-paso fade-up">
        <div class="proceso-numero">${p.numero}</div>
        <h4>${p.titulo}</h4>
        <p>${p.descripcion}</p>
      </div>
    `).join('');
  }

  // Productos recomendados
  const prodGrid = document.getElementById('empresas-productos-grid');
  if (prodGrid && products && emp.productosIds) {
    const seleccionados = emp.productosIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean);

    prodGrid.innerHTML = seleccionados.map(p => `
      <article class="product-card preview fade-up">
        <div class="carousel">
          ${p.destacado ? '<span class="product-badge-dest">⭐ Destacado</span>' : ''}
          <div class="carousel-track">
            <div class="carousel-slide">
              <img src="../products/${p.id}/${p.imagenes[0]}" alt="${p.nombre}" loading="lazy" onerror="this.src='../assets/images/placeholder.png'">
            </div>
          </div>
        </div>
        <div class="product-body">
          <h3 class="product-nombre">${p.nombre}</h3>
          <div style="text-align: right;">
            <a href="../products/${p.id}/index.html" class="btn-preview btn-primary-preview">
              <span>Ver producto</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div class="product-footer">
            <span class="product-precio">${p.precio} CLP</span>
            <span class="product-impuestos">Impuestos Incluidos</span>
          </div>
        </div>
      </article>
    `).join('');
  }
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
   TESTIMONIOS — Carrusel de reseñas desde Supabase
   ══════════════════════════════════════════════════ */
async function initTestimonios() {
  const section = document.getElementById('testimonios');
  if (!section) return;

  const cfg = window.SUPABASE_CONFIG;
  const loading = document.getElementById('testimonios-loading');
  const empty = document.getElementById('testimonios-empty');
  const errorEl = document.getElementById('testimonios-error');
  const carousel = document.getElementById('testimonios-carousel');

  // Si no hay credenciales configuradas, la sección permanece oculta
  if (!cfg || !cfg.API_URL || !cfg.API_KEY) return;

  section.hidden = false;

  try {
    const res = await fetch(
      `${cfg.API_URL.replace(/\/$/, '')}/rest/v1/review?select=*&visible=eq.true&order=created_at.desc&limit=10`,
      {
        headers: {
          'apikey': cfg.API_KEY,
          'Authorization': `Bearer ${cfg.API_KEY}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const reviews = await res.json();

    loading.hidden = true;

    if (!Array.isArray(reviews) || reviews.length === 0) {
      empty.hidden = false;
      return;
    }

    carousel.hidden = false;
    buildTestimoniosCarousel(reviews);
    observeElements();

  } catch (err) {
    loading.hidden = true;
    errorEl.hidden = false;
  }
}

function buildTestimoniosCarousel(reviews) {
  const track = document.getElementById('testimonios-track');
  const dotsEl = document.getElementById('testimonios-dots');
  const prevBtn = document.getElementById('testimonios-prev');
  const nextBtn = document.getElementById('testimonios-next');
  const viewport = document.getElementById('testimonios-viewport');
  if (!track || !dotsEl || !prevBtn || !nextBtn || !viewport) return;

  let current = 0;
  let autoTimer = null;
  let visibleCount = 3;
  let cardPx = 0;
  const GAP = 24; // debe coincidir con gap: 24px en CSS

  function byteaToDataUrl(raw) {
    if (!raw) return null;
    if (typeof raw === 'string') {
      if (raw.startsWith('\\x') || raw.startsWith('0x')) {
        const hex = raw.replace(/^\\x|^0x/i, '');
        try {
          const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
          let bin = '';
          bytes.forEach(b => { bin += String.fromCharCode(b); });
          return `data:image/jpeg;base64,${btoa(bin)}`;
        } catch { return null; }
      }
      return `data:image/jpeg;base64,${raw}`;
    }
    return null;
  }

  function renderStars(n) {
    const val = Math.max(1, Math.min(5, Number(n) || 5));
    return Array.from({ length: 5 }, (_, i) =>
      `<span class="testimonio-star ${i < val ? 'filled' : ''}" aria-hidden="true">★</span>`
    ).join('');
  }

  function formatDate(ts) {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' , day: 'numeric' });
  }

  // Render tarjetas
  track.innerHTML = reviews.map((r, i) => {
    const imgSrc = byteaToDataUrl(r.image);
    const imgHtml = imgSrc
      ? `<div class="testimonio-photo"><img src="${imgSrc}" alt="Foto de producto de ${r.user_name || 'cliente'}" loading="lazy" class="testimonio-img"></div>`
      : `<div class="testimonio-img-fallback" aria-hidden="true"></div>`;
    return `
      <div class="testimonio-card" role="tabpanel" aria-label="Reseña ${i + 1} de ${reviews.length}">
        
        <div class="testimonio-footer">
          <div class="testimonio-stars" aria-label="${r.qualification || 5} estrellas">${renderStars(r.qualification)}</div>
          <p class="testimonio-name">${r.user_name || 'Cliente'}</p>
          <p class="testimonio-comment">${r.comment || 'Sin comentario'}</p>
          ${imgHtml}
          <p class="testimonio-date">${formatDate(r.created_at)}</p>
        </div>
      </div>
    `;
  }).join('');

  function getVisibleCount() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 960) return 2;
    return Math.min(3, reviews.length);
  }

  function maxIdx() {
    return Math.max(0, reviews.length - visibleCount);
  }

  function updateCardSizes() {
    visibleCount = getVisibleCount();
    cardPx = (viewport.offsetWidth - (visibleCount - 1) * GAP) / visibleCount;
    track.querySelectorAll('.testimonio-card').forEach(c => {
      c.style.width = cardPx + 'px';
    });
  }

  function applyTranslation() {
    track.style.transform = `translateX(-${current * (cardPx + GAP)}px)`;
  }

  function syncDots() {
    dotsEl.querySelectorAll('.testimonios-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', String(i === current));
    });
  }

  function rebuildDots() {
    const positions = maxIdx() + 1;
    const needNav = positions > 1;
    prevBtn.hidden = !needNav;
    nextBtn.hidden = !needNav;
    dotsEl.hidden = !needNav;
    if (!needNav) { dotsEl.innerHTML = ''; return; }

    dotsEl.innerHTML = Array.from({ length: positions }, (_, i) =>
      `<button class="testimonios-dot ${i === current ? 'active' : ''}" role="tab" aria-selected="${i === current}" aria-label="Posición ${i + 1}"></button>`
    ).join('');

    dotsEl.querySelectorAll('.testimonios-dot').forEach((d, i) => {
      d.addEventListener('click', () => { goTo(i); startAuto(); });
    });
  }

  function goTo(index) {
    const total = maxIdx();
    current = total <= 0 ? 0 : ((index % (total + 1)) + (total + 1)) % (total + 1);
    applyTranslation();
    syncDots();
  }

  function startAuto() {
    stopAuto();
    if (maxIdx() <= 0) return;
    autoTimer = setInterval(() => goTo(current >= maxIdx() ? 0 : current + 1), 5000);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  function layout() {
    updateCardSizes();
    current = Math.min(current, maxIdx());
    applyTranslation();
    rebuildDots();
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
  }, { passive: true });

  viewport.addEventListener('mouseenter', stopAuto);
  viewport.addEventListener('mouseleave', startAuto);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 150);
  });

  layout();
  startAuto();
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
