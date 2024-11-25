import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rypzsgaryawrmmzeniwg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cHpzZ2FyeWF3cm1temVuaXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNTI1ODYsImV4cCI6MjA0NzkyODU4Nn0.6nzpyFAPas_QKmbmxM1mLRtjwLWvvpo-w-WaMojiAso';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;