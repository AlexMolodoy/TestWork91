/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

export const onLoginHandler = async (
  username: string,
  password: string,
  setLoading: (value: boolean) => void
) => {
  try {
    setLoading(true)
    const request = await axios.post(
      `${API_URL}/login`,
      { username, password },
      { withCredentials: true }
    )
    return request.data
  } catch (e) {
    console.log('Login error:', e)
  } finally {
    setLoading(false)
  }
}

export const onVerifyAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/verify`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message || 'Authorization check failed'
    )
  }
}
