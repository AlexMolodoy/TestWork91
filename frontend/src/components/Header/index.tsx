'use client'

import useAuthConditionReq from '@/handlers/authConditionReq'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import styles from './Header.module.scss'

export default function Header() {
  const { isAuthenticated, user } = useAuthStore()

  const router = useRouter()
  useAuthConditionReq()

  const handleLogout = () => {
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    })
    useAuthStore.getState().setIsAuthenticated(false)
  }

  return (
    <header className={styles.headerContainer}>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
          <span className={styles.userInfo}>
            Logged in as {user?.firstName} {user?.lastName}
          </span>
        </>
      ) : (
        <button
          onClick={() => router.push('/login')}
          className={styles.loginButton}
        >
          Login
        </button>
      )}
    </header>
  )
}
