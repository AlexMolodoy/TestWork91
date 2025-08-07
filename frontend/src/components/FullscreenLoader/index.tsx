import styles from './FullscreenLoader.module.scss'

export default function FullscreenLoader() {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
    </div>
  )
}
