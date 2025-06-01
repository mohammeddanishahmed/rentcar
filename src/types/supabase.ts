export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          id: number
          created_at: string
          make: string
          model: string
          year: number
          daily_rate: number
          description: string
          image_url: string
          category: string
          available: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          make: string
          model: string
          year: number
          daily_rate: number
          description: string
          image_url: string
          category: string
          available?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          make?: string
          model?: string
          year?: number
          daily_rate?: number
          description?: string
          image_url?: string
          category?: string
          available?: boolean
        }
      }
      reservations: {
        Row: {
          id: number
          created_at: string
          user_id: string
          car_id: number
          start_date: string
          end_date: string
          total_price: number
          status: string
        }
        Insert: {
          id?: number
          created_at?: string
          user_id: string
          car_id: number
          start_date: string
          end_date: string
          total_price: number
          status?: string
        }
        Update: {
          id?: number
          created_at?: string
          user_id?: string
          car_id?: number
          start_date?: string
          end_date?: string
          total_price?: number
          status?: string
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          avatar_url: string | null
          is_admin: boolean
        }
        Insert: {
          id: string
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_admin?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_admin?: boolean
        }
      }
    }
  }
}