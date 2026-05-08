import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Création du client Supabase pour l'application StreamView
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
