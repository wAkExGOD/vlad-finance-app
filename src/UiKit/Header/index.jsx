import styles from './Header.module.scss';

export default function Header({ onPrevArrowClick, onClose, title }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {onPrevArrowClick && <button className={[styles.btn, styles.prev].join(' ')} onClick={onPrevArrowClick}>←</button>}
      <button className={[styles.btn, styles.close].join(' ')} onClick={onClose}>×</button>
    </div>
  )
}