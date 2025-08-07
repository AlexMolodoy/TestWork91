'use client'

import CardGrid from '@/components/CardGrid'
import { Product } from '@/components/CardGrid/types'
import { onVerifyAuth } from '@/handlers/authService'
import useDataDownload from '@/hooks/useDataDownload'
import { useAuthStore } from '@/stores/authStore'
import { AuthData } from '@/types'
import { useEffect } from 'react'

export default function HomePage() {
  const { setIsAuthenticated, setUser } = useAuthStore()
  async function verifyAuth() {
    const authData = (await onVerifyAuth()) as AuthData
    if (authData) {
      setIsAuthenticated(authData?.isAuthenticated)
      setUser(authData?.user)
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
    return authData
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  const url = 'https://dummyjson.com/products?limit=12'
  const { data: productsData } = useDataDownload(url)
  return <CardGrid data={productsData as { products: Product[] }} />
}
