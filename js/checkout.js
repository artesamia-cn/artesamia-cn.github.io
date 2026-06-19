(function () {
  const STORAGE_KEY = 'artesamia-cart';
  const BASE_URL = 'https://artesamia.cl';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  }

  function formatCLP(n) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);
  }

  function getTotal(cart) {
    return cart.reduce((s, i) => s + i.price * i.quantity, 0);
  }

  const COMUNAS_ENVIO_GRATIS = new Set([
    'Santiago', 'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central',
    'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana',
    'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú',
    'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura',
    'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón', 'Vitacura',
    'San Bernardo', 'Puente Alto'
  ]);

  const REGIONES_5900 = new Set([
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta',
    'Aysén del General Carlos Ibáñez del Campo', 'Magallanes y de la Antártica Chilena'
  ]);

  const REGIONES_4900 = new Set([
    'Atacama', 'Coquimbo', 'Valparaíso',
    "Libertador General Bernardo O'Higgins", 'Maule', 'Ñuble', 'Biobío',
    'La Araucanía', 'Los Ríos', 'Los Lagos'
  ]);

  function calcularEnvio(region, comuna, subtotal) {
    if (!region || !comuna) return null;
    if (region === 'Metropolitana de Santiago') {
      if (subtotal >= 20000 && COMUNAS_ENVIO_GRATIS.has(comuna)) return 0;
      return 2900;
    }
    if (REGIONES_5900.has(region)) return 5900;
    if (REGIONES_4900.has(region)) return 4900;
    return 2900;
  }

  function actualizarEnvio() {
    const region = document.getElementById('co-region')?.value || '';
    const comuna = document.getElementById('co-comuna')?.value || '';
    const subtotal = getTotal(getCart());
    const envio = calcularEnvio(region, comuna, subtotal);

    const subtotalEl = document.getElementById('checkout-subtotal-amount');
    const envioEl = document.getElementById('checkout-shipping-amount');
    const totalEl = document.getElementById('checkout-total-amount');

    if (subtotalEl) subtotalEl.textContent = formatCLP(subtotal);
    if (!envioEl || !totalEl) return;

    let totalConEnvio = subtotal;
    if (envio === null) {
      envioEl.textContent = 'Selecciona tu región y comuna';
      envioEl.style.color = '#888';
    } else if (envio === 0) {
      envioEl.textContent = 'Gratis';
      envioEl.style.color = '#16a34a';
    } else {
      envioEl.textContent = formatCLP(envio);
      envioEl.style.color = '';
      totalConEnvio = subtotal + envio;
    }
    totalEl.textContent = formatCLP(totalConEnvio);

    const ivaEl = document.getElementById('checkout-tax-note');
    if (ivaEl) {
      const iva = Math.round((totalConEnvio / 119) * 19);
      ivaEl.textContent = 'Incluye ' + formatCLP(iva) + ' de impuestos (IVA 19%)';
    }
  }

  function showStatus(type, msg) {
    const el = document.getElementById('checkout-status-msg');
    el.className = 'checkout-status ' + type;
    el.textContent = msg;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function formatFecha(isoString) {
    return new Date(isoString).toLocaleString('es-CL', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }

  function showTransactionInfo(preferenceId, order) {
    const el = document.getElementById('checkout-status-msg');
    const info = document.createElement('div');
    info.className = 'checkout-transaction-info';
    info.innerHTML = `
      <h3><strong>Información de la Transacción</strong></h3>
      <p><strong>Medio de Pago:</strong> Mercado Pago</p>
      <p><strong>Monto Pagado:</strong> ${formatCLP(order.total_order)}</p>
      <p><strong>Identificador:</strong> ${preferenceId}</p>
      <p><strong>Fecha de la Transacción:</strong> ${formatFecha(order.created_at)}</p>
    `;
    el.appendChild(info);
  }

  async function fetchOrderInfo(preferenceId) {
    const cfg = window.SUPABASE_CONFIG;
    if (!cfg || !cfg.API_URL || !cfg.API_KEY || !preferenceId) return null;

    const base = cfg.API_URL.replace(/\/$/, '');
    const url = base + '/rest/v1/order?preference_id=eq.' + encodeURIComponent(preferenceId) + '&select=total_order,created_at';

    try {
      const res = await fetch(url, {
        headers: {
          'apikey': cfg.API_KEY,
          'Authorization': 'Bearer ' + cfg.API_KEY
        }
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !Array.isArray(data) || data.length === 0) return null;
      return data[0];
    } catch (e) {
      console.error('[fetchOrderInfo] error de red:', e);
      return null;
    }
  }

  function renderCartSummary(cart) {
    const itemsEl = document.getElementById('checkout-items');

    itemsEl.innerHTML = cart.map((item, index) => {
      const requiereImg = item.requiereImg;
      const cantidadImg = (item.cantidadImg) || 0;

      const imgHtml = requiereImg === 'true' ? `
        <div class="checkout-item-images">
          <label class="checkout-img-label">
            * Adjunta exactamente <strong>${cantidadImg} foto${cantidadImg > 1 ? 's' : ''}</strong> para personalización (máx. 5 MB c/u):
          </label>
          <input type="file"
                 class="checkout-item-img-input"
                 data-item-index="${index}"
                 data-required-count="${cantidadImg}"
                 accept="image/*"
                 ${cantidadImg > 1 ? 'multiple' : ''} />
          <span class="checkout-img-feedback" id="img-feedback-${index}"></span>
          <span class="field-error checkout-img-error" id="img-err-${index}"></span>
        </div>
      ` : '';

      return `
        <div class="checkout-item">
          <div class="checkout-item-row">
            <span class="checkout-item-name">${item.name}</span>
            <span class="checkout-item-qty">x${item.quantity}</span>
            <span>${formatCLP(item.price * item.quantity)}</span>
          </div>
          <textarea class="checkout-item-notes" data-item-index="${index}" placeholder="Instrucciones especiales para este producto (opcional)"></textarea>
          ${imgHtml}
        </div>
      `;
    }).join('');

    itemsEl.querySelectorAll('.checkout-item-img-input').forEach(input => {
      input.addEventListener('change', () => handleImageChange(input));
    });

    actualizarEnvio();
  }

  function handleImageChange(input) {
    const index = input.dataset.itemIndex;
    const required = Number(input.dataset.requiredCount);
    const files = Array.from(input.files);
    const feedbackEl = document.getElementById('img-feedback-' + index);
    const errEl = document.getElementById('img-err-' + index);

    errEl.classList.remove('visible');
    const oversized = files.filter(f => f.size > 5 * 1024 * 1024);

    if (oversized.length > 0) {
      errEl.textContent = (oversized.length > 1 ? oversized.length + ' imágenes superan' : 'Una imagen supera') + ' los 5 MB.';
      errEl.classList.add('visible');
      feedbackEl.textContent = '';
    } else {
      feedbackEl.textContent = files.length + ' de ' + required + ' imagen' + (required > 1 ? 'es' : '') + ' seleccionada' + (files.length !== 1 ? 's' : '') + '.';
    }
  }

  function validateImages() {
    let valid = true;
    document.querySelectorAll('.checkout-item-img-input').forEach(input => {
      const index = input.dataset.itemIndex;
      const required = Number(input.dataset.requiredCount);
      const files = Array.from(input.files);
      const errEl = document.getElementById('img-err-' + index);
      errEl.classList.remove('visible');

      const oversized = files.filter(f => f.size > 5 * 1024 * 1024);
      if (oversized.length > 0) {
        errEl.textContent = 'Una o más imágenes superan los 5 MB. Reduce su tamaño e intenta nuevamente.';
        errEl.classList.add('visible');
        valid = false;
      } else if (files.length !== required) {
        errEl.textContent = 'Debes adjuntar exactamente ' + required + ' imagen' + (required > 1 ? 'es' : '') + ' para personalización.';
        errEl.classList.add('visible');
        valid = false;
      }
    });
    return valid;
  }

  function buildImageFilesMap() {
    const map = {};
    document.querySelectorAll('.checkout-item-img-input').forEach(input => {
      const index = Number(input.dataset.itemIndex);
      if (input.files.length > 0) map[index] = Array.from(input.files);
    });
    return map;
  }

  async function updateOrderStatus(preferenceId, stateOrder) {
    const cfg = window.SUPABASE_CONFIG;
    if (!cfg || !cfg.API_URL || !cfg.API_KEY) return;


    if (!preferenceId) {
      console.warn('preference_id ausente en la URL — no se puede actualizar la orden');
      console.groupEnd();
      return;
    }

    const base = cfg.API_URL.replace(/\/$/, '');
    const url = base + '/rest/v1/order?preference_id=eq.' + encodeURIComponent(preferenceId);

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': cfg.API_KEY,
          'Authorization': 'Bearer ' + cfg.API_KEY,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ state_order: stateOrder })
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error('respuesta de error:', data);
      } else if (Array.isArray(data) && data.length === 0) {
        console.warn('PATCH OK pero 0 filas actualizadas — ¿preference_id coincide con lo guardado en la BD?');
      } 
    } catch (e) {
      console.error('[updateOrderStatus] error de red:', e);
    }

    console.groupEnd();
  }

  async function callEdgeFunction(preferenceId, status) {
    const cfg = window.SUPABASE_CONFIG;
    if (!cfg || !cfg.API_URL || !cfg.API_KEY || !preferenceId) return;

    const url = cfg.API_URL.replace(/\/$/, '') + '/functions/v1/confirmar-pago';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': cfg.API_KEY,
          'Authorization': 'Bearer ' + cfg.API_KEY
        },
        body: JSON.stringify({ preference_id: preferenceId, status })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) 
        console.error('[EdgeFunction] error:', data);
    } catch (e) {
      console.error('[EdgeFunction] error de red:', e);
    }
  }

  function handleReturnStatus() {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const preferenceId = params.get('preference_id');

    if (preferenceId && status) {
      callEdgeFunction(preferenceId, status);
    }

    const stateMap = { success: 'approved', failure: 'failed', pending: 'pending' };
    if (stateMap[status]) {
      updateOrderStatus(preferenceId, stateMap[status]);
    }

    if (status === 'success') {
      showStatus('success', '¡Pago exitoso! Recibirás un email de confirmación. Gracias por tu compra en Artesamía.');
      localStorage.removeItem(STORAGE_KEY);

      fetchOrderInfo(preferenceId).then(order => {
        if (order != null) showTransactionInfo(preferenceId, order);
      });
    } else if (status === 'failure') {
      showStatus('failure', 'Hubo un problema con el pago. Puedes intentarlo nuevamente.');
    } else if (status === 'pending') {
      showStatus('pending', 'Tu pago está pendiente de confirmación. Te avisaremos por email cuando se acredite.');
      fetchOrderInfo(preferenceId).then(order => {
          if (order != null) showTransactionInfo(preferenceId, order);
      });
    }
  }

  async function createPreference(cart, payer, costoEnvio) {
    const token = window.MERCADOPAGO_CONFIG && window.MERCADOPAGO_CONFIG.ACCESS_TOKEN;
    if (!token) throw new Error('Configuración de MercadoPago no disponible.');

    const items = cart.map(item => ({
      title: item.name,
      quantity: item.quantity,
      currency_id: 'CLP',
      unit_price: Math.round(item.price)
    }));
    if (costoEnvio > 0) {
      items.push({ title: 'Envío', quantity: 1, currency_id: 'CLP', unit_price: costoEnvio });
    }

    const body = {
      items,
      payer: {
        name: payer.nombre,
        email: payer.email,
        phone: { area_code: '56', number: payer.telefono || '' }
      },
      back_urls: {
        success: BASE_URL + '/pages/checkout.html?status=success',
        failure: BASE_URL + '/pages/checkout.html?status=failure',
        pending: BASE_URL + '/pages/checkout.html?status=pending'
      },
      auto_return: 'approved',
      statement_descriptor: 'Artesamia'
    };

    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al crear la preferencia de pago.');
    }

    return res.json();
  }

  async function sbPost(base, apiKey, path, body, returnRepresentation) {

    let res;
    try {
      res = await fetch(base + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
          'Authorization': 'Bearer ' + apiKey,
          'Prefer': returnRepresentation ? 'return=representation' : 'return=minimal'
        },
        body: JSON.stringify(body)
      });
    } catch (networkErr) {
      throw networkErr;
    }


    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const msg = errBody.message || errBody.hint || errBody.details || ('HTTP ' + res.status);
      throw new Error('[Supabase] ' + path + ': ' + msg);
    }

    const data = returnRepresentation ? await res.json() : null;
    return data;
  }

  async function createZipBase64(files) {
    const zip = new JSZip();
    files.forEach(file => zip.file(file.name, file));
    return zip.generateAsync({ type: 'base64', compression: 'DEFLATE' });
  }

  async function saveOrder({ nombre, rut, email, telefono, direccion, depto, region, comuna, cart, total, preferenceId, imageFilesMap }) {
    const cfg = window.SUPABASE_CONFIG;
    if (!cfg || !cfg.API_URL || !cfg.API_KEY) return;

    const base = cfg.API_URL.replace(/\/$/, '');
    const key  = cfg.API_KEY;

    var rows = await sbPost(
      base, 
      key, 
      '/rest/v1/order',
      { 
        total_order: total, 
        state_order: 'pending',
        preference_id: preferenceId
      },
      true
    );
    
    const orderId = rows?.[0]?.id;
    if (!orderId) throw new Error('[Supabase] No se obtuvo id de la orden creada');

    const nameParts = nombre.trim().split(/\s+/);

    await sbPost(
      base, 
      key, 
      '/rest/v1/detail_order', 
      {
        order_id: orderId,
        customer_name: nameParts[0] || '',
        customer_second_name: nameParts.slice(1).join(' ') || '',
        customer_mail: email,
        customer_phone: telefono || '',
        customer_rut: rut || '',
        customer_address_1: direccion || '',
        customer_address_2: depto || '',
        customer_address_3: comuna || '',
        customer_address_4: region || ''
      },
      false);

    const imgData = {};
    for (const [idxStr, files] of Object.entries(imageFilesMap || {})) {
      const idx = Number(idxStr);
      if (cart[idx]) {
        try {
          imgData[idx] = await createZipBase64(files);
        } catch (e) {
          console.error('[saveOrder] Error creando zip para ítem', idx, e);
        }
      }
    }

    await sbPost(
      base,
      key,
      '/rest/v1/product_order',
      cart.map((item, idx) => ({
        order_id: orderId,
        id_product: item.id,
        amount: item.quantity,
        unit_price: Math.round(item.price),
        product_total_amount: Math.round(item.price * item.quantity),
        detail_1: item.name,
        detail_2: item.specialInstructions || '',
        detail_3: '',
        img_product: imgData[idx] || null
      })),
      false
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    handleReturnStatus();

    const cart = getCart();
    const emptyEl = document.getElementById('cart-empty-checkout');
    const mainEl = document.getElementById('checkout-main');

    if (cart.length === 0) {
      emptyEl.style.display = 'block';
    } else {
      mainEl.style.display = 'grid';
      renderCartSummary(cart);
    }

    const form = document.getElementById('checkout-form');
    const btn = document.getElementById('checkout-btn');

    const regionSelect = document.getElementById('co-region');
    const comunaSelect = document.getElementById('co-comuna');
    const regiones = window.CHILE_REGIONES || [];

    if (regionSelect) {
      regiones.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.nombre;
        opt.textContent = r.nombre;
        regionSelect.appendChild(opt);
      });

      regionSelect.addEventListener('change', () => {
        setFieldError('co-region', 'err-region', false);
        const region = regiones.find(r => r.nombre === regionSelect.value);
        comunaSelect.innerHTML = '';

        if (!region) {
          comunaSelect.appendChild(new Option('Selecciona primero una región', ''));
          comunaSelect.disabled = true;
          actualizarEnvio();
          return;
        }

        comunaSelect.disabled = false;
        comunaSelect.appendChild(new Option('Selecciona una comuna', ''));
        region.comunas.forEach(c => comunaSelect.appendChild(new Option(c, c)));
        actualizarEnvio();
      });

      comunaSelect.addEventListener('change', () => {
        setFieldError('co-comuna', 'err-comuna', false);
        actualizarEnvio();
      });
    }

    function isValidEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    }

    function isValidPhone(v) {
      if (!v) return true;
      const digits = v.replace(/\D/g, '');
      return digits.length === 9 || (digits.length === 11 && digits.startsWith('56'));
    }

    function isValidRut(v) {
      if (!v) return false;
      const clean = v.replace(/[.\-\s]/g, '').toUpperCase();
      if (!/^\d{7,8}[0-9K]$/.test(clean)) return false;
      const body = clean.slice(0, -1);
      const dv = clean.slice(-1);
      let sum = 0, mult = 2;
      for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * mult;
        mult = mult === 7 ? 2 : mult + 1;
      }
      const rem = 11 - (sum % 11);
      const expected = rem === 11 ? '0' : rem === 10 ? 'K' : String(rem);
      return dv === expected;
    }

    function setFieldError(inputId, errId, invalid) {
      const input = document.getElementById(inputId);
      const err = document.getElementById(errId);
      input.classList.toggle('invalid', invalid);
      err.classList.toggle('visible', invalid);
    }

    document.getElementById('co-nombre')?.addEventListener('input', () => setFieldError('co-nombre', 'err-nombre', false));
    document.getElementById('co-email')?.addEventListener('input', () => setFieldError('co-email', 'err-email', false));

    const rutInput = document.getElementById('co-rut');
    if (rutInput) {
      rutInput.addEventListener('keydown', (e) => {
        const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Home','End'];
        if (!allowed.includes(e.key) && !/^[\dKk]$/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
      });

      rutInput.addEventListener('input', () => {
        setFieldError('co-rut', 'err-rut', false);
        const clean = rutInput.value.replace(/[.\-\s]/g, '').toUpperCase().replace(/[^0-9K]/g, '').slice(0, 9);
        if (clean.length === 0) { rutInput.value = ''; return; }
        if (clean.length === 1) { rutInput.value = clean; return; }
        const dv = clean.slice(-1);
        const body = clean.slice(0, -1);
        const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        rutInput.value = formatted + '-' + dv;
      });
    }

    const telInput = document.getElementById('co-telefono');
    if (telInput) {
      telInput.addEventListener('keydown', (e) => {
        const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Home','End'];
        if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault();
      });

      telInput.addEventListener('input', () => {
        setFieldError('co-telefono', 'err-telefono', false);
        const digits = telInput.value.replace(/^\+?56\s*/, '').replace(/\D/g, '').slice(0, 9);
        if (!digits) { telInput.value = ''; return; }
        let formatted = '+56 ';
        if (digits.length <= 1) formatted += digits;
        else if (digits.length <= 5) formatted += digits[0] + ' ' + digits.slice(1);
        else formatted += digits[0] + ' ' + digits.slice(1, 5) + ' ' + digits.slice(5);
        telInput.value = formatted;
      });
    }

    form && form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const nombre = document.getElementById('co-nombre').value.trim();
      const rut = document.getElementById('co-rut').value.trim();
      const email = document.getElementById('co-email').value.trim();
      const telefono = document.getElementById('co-telefono').value.trim();
      const direccion = document.getElementById('co-direccion').value.trim();
      const depto = document.getElementById('co-depto').value.trim();
      const region = document.getElementById('co-region').value;
      const comuna = document.getElementById('co-comuna').value;

      const errNombre = !nombre;
      const errRut = !isValidRut(rut);
      const errEmail = !isValidEmail(email);
      const errTel = !isValidPhone(telefono);
      const errDireccion = !direccion;
      const errRegion = !region;
      const errComuna = !comuna;

      setFieldError('co-nombre', 'err-nombre', errNombre);
      setFieldError('co-rut', 'err-rut', errRut);
      setFieldError('co-email', 'err-email', errEmail);
      setFieldError('co-telefono', 'err-telefono', errTel);
      setFieldError('co-direccion', 'err-direccion', errDireccion);
      setFieldError('co-region', 'err-region', errRegion);
      setFieldError('co-comuna', 'err-comuna', errComuna);

      if (errNombre || errRut || errEmail || errTel || errDireccion || errRegion || errComuna) return;

      document.querySelectorAll('.checkout-item-notes').forEach(textarea => {
        const idx = Number(textarea.dataset.itemIndex);
        if (cart[idx]) cart[idx].specialInstructions = textarea.value.trim();
      });

      if (!validateImages()) {
        document.querySelector('.checkout-img-error.visible')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      const imageFilesMap = buildImageFilesMap();

      const subtotal = getTotal(cart);
      const costoEnvio = calcularEnvio(region, comuna, subtotal) || 0;

      btn.disabled = true;
      btn.textContent = 'Creando orden…';

      try {
        const preference = await createPreference(cart, { nombre, email, telefono }, costoEnvio);

        try {
          await saveOrder({ nombre, rut, email, telefono, direccion, depto, region, comuna, cart, total: subtotal + costoEnvio, preferenceId: preference.id, imageFilesMap });
        } catch (saveErr) {
          console.error('saveOrder falló:', saveErr.message);
        }

        window.location.href = preference.init_point;
      } catch (err) {
        showStatus('failure', 'No se pudo iniciar el pago: ' + err.message);
        btn.disabled = false;
        btn.textContent = 'Pagar con Mercado Pago';
      }
    });
  });
})();
