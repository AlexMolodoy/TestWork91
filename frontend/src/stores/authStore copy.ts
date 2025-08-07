import { User } from '@/types'
import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  setIsAuthenticated: (token: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  user: null,
  setUser: (user) => set({ user }),
}))
