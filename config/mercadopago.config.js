const MERCADOPAGO_CONFIG = {
  ACCESS_TOKEN: '__VALOR_ACCESS_TOKEN__',
  PUBLIC_KEY: '__VALOR_PUBLIC_KEY__'
};

if (typeof window !== 'undefined') window.MERCADOPAGO_CONFIG = MERCADOPAGO_CONFIG;
if (typeof module !== 'undefined') module.exports = MERCADOPAGO_CONFIG;
