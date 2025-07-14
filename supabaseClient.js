import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eosqnfrixpvtqhybvobn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvc3FuZnJpeHB2dHFoeWJ2b2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzOTkyMzgsImV4cCI6MjA2Nzk3NTIzOH0.m6KY_4nIHgHumWk6NqXGWWUHGInT-M7fiTbM1PV7OOU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
