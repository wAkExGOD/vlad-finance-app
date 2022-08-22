import Portal from "../Portal";
import styles from './OverlayingPopup.module.scss';

const OverlayingPopup = ({ children, onClose, isOpened }) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.container} role="dialog">
        <div
          className={styles.overlay}
          role="button"
          tabIndex={0}
          onClick={onClose}
        />
        {children}
      </div>
    </Portal>
  );
}

export default OverlayingPopup;