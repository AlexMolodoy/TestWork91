export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
}

export interface LoginResponse {
  success: boolean
  message?: string
  token?: string
  user?: {
    id: number
    username: string
    firstName: string
    lastName: string
  }
}

export interface AuthData {
  isAuthenticated: boolean
  user: User | null
}
export interface VerifyResponse {
  message: string
  user?: {
    id: string
    username: string
  }
}
export interface RefreshResponse {
  message: string
}
export interface AuthError {
  message: string
}
export interface AuthService {
  onLoginHandler: (username: string, password: string) => Promise<LoginResponse>
  onVerifyAuth: () => Promise<VerifyResponse>
  onRefreshAuth: () => Promise<RefreshResponse>
}
