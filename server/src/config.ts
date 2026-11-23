import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
dotenv.config(); // Also check current dir

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  demoMode: process.env.DEMO_MODE !== 'false',
};
