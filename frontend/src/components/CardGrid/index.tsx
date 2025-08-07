import { useLoadingStore } from '@/stores/loadingStore'
import Card from '../Card'
import FullscreenLoader from '../FullscreenLoader'
import styles from './CardGrid.module.scss'
import { Product } from './types'

interface CardGridProps {
  data: {
    products: Product[]
  }
}

export default function CardGrid({ data }: CardGridProps) {
  const { isLoading } = useLoadingStore()

  return (
    <>
      {isLoading && <FullscreenLoader />}
      <div className={styles.cardGrid}>
        {data &&
          data.products.map((card: Product) => (
            <Card
              key={card.id}
              image={card.images[0]}
              title={card.title}
              description={card.description}
              category={card.category}
              price={card.price}
            />
          ))}
      </div>
    </>
  )
}
