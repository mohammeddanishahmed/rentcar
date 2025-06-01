import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_admin?: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  signIn: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Get the user profile
      if (data.user) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('first_name, last_name, is_admin')
          .eq('id', data.user.id);
          
        // If no profile exists, create one
        if (!profiles || profiles.length === 0) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              is_admin: false,
            });
            
          if (insertError) throw insertError;
          
          set({
            user: {
              id: data.user.id,
              email: data.user.email!,
              is_admin: false,
            },
            isLoading: false,
          });
        } else {
          set({
            user: {
              id: data.user.id,
              email: data.user.email!,
              ...profiles[0],
            },
            isLoading: false,
          });
        }
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  signUp: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Create a profile for the new user
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          is_admin: false,
        });
      }
      
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  getUser: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('first_name, last_name, is_admin')
          .eq('id', user.id);
          
        // If no profile exists, create one
        if (!profiles || profiles.length === 0) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              is_admin: false,
            });
            
          if (insertError) throw insertError;
          
          set({
            user: {
              id: user.id,
              email: user.email!,
              is_admin: false,
            },
            isLoading: false,
          });
        } else {
          set({
            user: {
              id: user.id,
              email: user.email!,
              ...profiles[0],
            },
            isLoading: false,
          });
        }
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false, user: null });
    }
  },
}));