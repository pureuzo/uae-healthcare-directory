import { create } from 'zustand'

export interface SearchFilters {
  specialty: string
  location: string
  insurance: string
}

export interface DoctorResult {
  id: string
  name: string
  specialty: string
  location: string
  hospital: string
  experience_years: number
  google_rating: number | null
  google_reviews_count: number | null
  insurance_accepted: string[]
}

interface Store {
  filters: SearchFilters
  setFilters: (filters: SearchFilters) => void
  resetFilters: () => void
  searchResults: DoctorResult[]
  setSearchResults: (results: DoctorResult[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

const initialFilters: SearchFilters = {
  specialty: '',
  location: '',
  insurance: '',
}

export const useStore = create<Store>((set) => ({
  filters: initialFilters,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: initialFilters }),
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}))