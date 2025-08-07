import { create } from 'zustand'

import { User } from '@/types'

interface AuthState {
  isAuthenticated: boolean
  setIsAuthenticated: (token: boolean) => void
  authErrorCondition: boolean
  setAuthErrorCondition: (authErrorCondition: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  authErrorCondition: false,
  setAuthErrorCondition: (authErrorCondition) => set({ authErrorCondition }),
  user: null,
  setUser: (user) => set({ user }),
}))
