import Portal from '../Portal';
import styles from './FullScreenPopup.module.scss';

export default function index({ children }) {
  return (
    <Portal>
      <div className={styles.popup}>
        {children}
      </div>
    </Portal>
  )
}