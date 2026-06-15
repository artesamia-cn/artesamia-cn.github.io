const MP_CONFIG = {
  ACCESS_TOKEN: '___VALOR_ACCESS_TOKEN___',
  PUBLIC_KEY: '___VALOR_PUBLIC_KEY___'
};

if (typeof window !== 'undefined') window.MP_CONFIG = MP_CONFIG;
if (typeof module !== 'undefined') module.exports = MP_CONFIG;
