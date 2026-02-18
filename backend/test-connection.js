import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please check backend/.env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testConnection() {
  console.log('====================================');
  console.log('  Testing Supabase Connection');
  console.log('====================================');
  console.log('');

  try {
    console.log('Testing algorithms table...');
    const { data, error } = await supabase
      .from('algorithms')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error querying algorithms table:', error);
      throw error;
    }

    console.log('✓ Algorithms table exists and is accessible');
    console.log('  Sample data:', data);

  } catch (err) {
    console.error('❌ Connection test failed:', err);
    console.error('');
    console.error('Possible causes:');
    console.error('  1. Database tables not created (run schema.sql)');
    console.error('  2. Invalid SUPABASE_URL in .env');
    console.error('  3. Invalid API keys in .env');
    console.error('  4. Network connectivity issues');
    console.error('  5. RLS policies blocking access');
    process.exit(1);
  }

  console.log('');
  console.log('Testing user_profiles table...');
  try {
    const { data: userData, error: userError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);

    if (userError) {
      console.error('❌ Error querying user_profiles:', userError);
    } else {
      console.log('✓ User profiles table exists');
      console.log('  Sample data:', userData);
    }
  } catch (err) {
    console.error('❌ Error checking user_profiles:', err);
  }

  console.log('');
  console.log('====================================');
  console.log('  Test Summary');
  console.log('====================================');
  console.log('');
  console.log('If you see all ✓ marks, your database is ready!');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Start backend: cd backend && npm run dev');
  console.log('  2. Start frontend: npm run dev');
  console.log('  3. Visit: http://localhost:3000');
  console.log('');
}

testConnection();
