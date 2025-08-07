'use client'
import { useAuthStore } from '@/stores/authStore'
import styles from './Card.module.scss'

interface CardProps {
  image: string
  title: string
  description: string
  category: string
  price: number
}

export default function Card({ image, title, category, price }: CardProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{category}</p>
      <p className={styles.cardPrice}>${price.toFixed(2)}</p>
      {isAuthenticated && (
        <button className={styles.cardButton}>Add to cart</button>
      )}
    </div>
  )
}
