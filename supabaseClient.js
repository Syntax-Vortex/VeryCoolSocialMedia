import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zzxpsemlsammqjaqsxty.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6eHBzZW1sc2FtbXFqYXFzeHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NjI1MzgsImV4cCI6MjA4NDEzODUzOH0.kYNf_fJA_YimKYjXipEpvTLescXx850wfQfYyKHfRGI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
