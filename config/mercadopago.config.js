const MERCADOPAGO_CONFIG = {
  ACCESS_TOKEN: '___VALOR_ACCESS_TOKEN___',
  PUBLIC_KEY: '___VALOR_PUBLIC_KEY___'
};

if (typeof window !== 'undefined') window.MERCADOPAGO_CONFIG = MERCADOPAGO_CONFIG;
if (typeof module !== 'undefined') module.exports = MERCADOPAGO_CONFIG;
