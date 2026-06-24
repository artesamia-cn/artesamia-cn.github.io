const SUPABASE_CONFIG = {
  //API_URL: '___VALOR_API_URL___',
  //API_KEY: '___VALOR_API_KEY___' 
  API_URL: 'https://zbqrlyvjgfeycczixgqc.supabase.co/',
  API_KEY: 'sb_publishable_sE5jMRoQ-SNjuSMWJSY63g_OEGn5h8e' 
};

if (typeof window !== 'undefined') window.SUPABASE_CONFIG = SUPABASE_CONFIG;
if (typeof module !== 'undefined') module.exports = SUPABASE_CONFIG;
