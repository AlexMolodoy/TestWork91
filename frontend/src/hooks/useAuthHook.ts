import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

function useAuthHook() {
  const [accessToken, setAccessToken] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('accessToken')
    setAccessToken(!!token)
    setIsLoading(false)
  }, [])

  return { accessToken, isLoading }
}

export default useAuthHook
