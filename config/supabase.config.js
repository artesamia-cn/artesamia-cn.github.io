/**
 * =====================================================
 *  ARTESAMÍA — Configuración Supabase
 *  Completa con tus credenciales del proyecto Supabase.
 *  Las encuentras en: Settings → API → Project URL y anon key.
 * =====================================================
 */

const SUPABASE_CONFIG = {
  //url: 'https://zbqrlyvjgfeycczixgqc.supabase.co/',  
  //anonKey: 'sb_publishable_sE5jMRoQ-SNjuSMWJSY63g_OEGn5h8e',
  API_URL = "___VALOR_API_URL___",
  API_KEY = "___VALOR_API_KEY___"

};

if (typeof window !== 'undefined') window.SUPABASE_CONFIG = SUPABASE_CONFIG;
if (typeof module !== 'undefined') module.exports = SUPABASE_CONFIG;
