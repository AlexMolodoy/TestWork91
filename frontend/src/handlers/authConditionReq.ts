'use client'
import { useAuthStore } from '@/stores/authStore'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

function useAuthConditionReq() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

  useEffect(() => {
    const token = Cookies.get('accessToken')
    if (!!token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [setIsAuthenticated])
}

export default useAuthConditionReq
