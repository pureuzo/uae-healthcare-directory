import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tables = {
  doctors: {
    Row: {
      id: string
      name: string
      specialty: string
      location: string
      hospital: string
      experience_years: number
      qualifications: string
      email: string
      phone: string
      google_rating: number | null
      google_reviews_count: number | null
      insurance_accepted: string[]
      bio: string | null
      image_url: string | null
      verified: boolean
      created_at: string
      updated_at: string
    }
  }
}