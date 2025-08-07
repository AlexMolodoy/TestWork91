import { onLoginHandler } from '@/handlers/authService'
import { LoginResponse, User } from '@/types'

export const handleSubmit = async (
  setUser: (user: User | null) => void,
  e: React.FormEvent<HTMLFormElement>,
  setErrorMessage: (message: string | null) => void,
  setAuthErrorCondition: (condition: boolean) => void,
  setLoading: (value: boolean) => void
) => {
  e.preventDefault()
  setErrorMessage(null)
  setAuthErrorCondition(false)

  const formData = new FormData(e.currentTarget)
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    setErrorMessage('All fields are required.')
    return
  }

  if (username.length < 3 || password.length < 3) {
    setErrorMessage('Username and password must be at least 3 characters long.')
    return
  }

  const loginResponse = (await onLoginHandler(
    username,
    password,
    setLoading
  )) as LoginResponse

  if (!loginResponse) {
    setAuthErrorCondition(true)
    return
  }

  setUser(loginResponse.user ? { ...loginResponse.user } : null)
  window.location.href = '/'
}
