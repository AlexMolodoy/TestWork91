'use client'

import { handleSubmit } from '@/handlers/submitLoginForm'
import { useAuthStore } from '@/stores/authStore'
import { useLoadingStore } from '@/stores/loadingStore'
import { useEffect, useState } from 'react'
import styles from './Login.module.scss'

export default function LoginPage() {
  const {
    setUser,
    authErrorCondition,
    setAuthErrorCondition,
    isAuthenticated,
  } = useAuthStore()
  const { setLoading } = useLoadingStore()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/'
    }
  }, [isAuthenticated])

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    handleSubmit(setUser, e, setErrorMessage, setAuthErrorCondition, setLoading)
  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <form onSubmit={onHandleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" className={styles.loginButton}>
          Login
        </button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {authErrorCondition && (
          <p className={styles.errorMessage}>Invalid email or password</p>
        )}
      </form>
    </div>
  )
}
