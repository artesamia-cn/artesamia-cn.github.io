const SUPABASE_CONFIG = {
  API_URL: '___VALOR_API_URL___',
  API_KEY: '___VALOR_API_KEY___' 
};

if (typeof window !== 'undefined') window.SUPABASE_CONFIG = SUPABASE_CONFIG;
if (typeof module !== 'undefined') module.exports = SUPABASE_CONFIG;
