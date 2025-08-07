'use client'

import { useAuthStore } from '@/stores/authStore'
import styles from './Footer.module.scss'

export default function Footer() {
  const { user, isAuthenticated } = useAuthStore()

  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        &copy; {currentYear}{' '}
        {isAuthenticated && user && (
          <span className={styles.loggedInInfo}>Logged as {user.username}</span>
        )}
      </p>
    </footer>
  )
}
