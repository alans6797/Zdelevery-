import { createClient } from "@supabase/supabase-js"

// 🚨 Reemplaza esto con tu propia URL y tu clave anon public de Supabase:
const supabaseUrl = "https://uxdkzaalhxlvhbziakvy.supabase.co"
// Accedemos directamente a la variable de entorno (sin comillas)
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)
