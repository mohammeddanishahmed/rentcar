import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Car = Database['public']['Tables']['cars']['Row'];

interface CarState {
  cars: Car[];
  filteredCars: Car[];
  selectedCar: Car | null;
  isLoading: boolean;
  error: string | null;
  fetchCars: () => Promise<void>;
  fetchCarById: (id: number) => Promise<void>;
  filterCars: (category?: string, searchTerm?: string) => void;
}

export const useCarStore = create<CarState>((set, get) => ({
  cars: [],
  filteredCars: [],
  selectedCar: null,
  isLoading: false,
  error: null,
  
  fetchCars: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      set({ 
        cars: data, 
        filteredCars: data,
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  fetchCarById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      set({ selectedCar: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  filterCars: (category, searchTerm) => {
    const { cars } = get();
    let filtered = [...cars];
    
    if (category && category !== 'all') {
      filtered = filtered.filter(car => car.category === category);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(car => 
        car.make.toLowerCase().includes(term) || 
        car.model.toLowerCase().includes(term)
      );
    }
    
    set({ filteredCars: filtered });
  }
}));