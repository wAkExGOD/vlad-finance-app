import OverlayingPopup from '../OverlayingPopup';
import Header from '../Header';
import styles from './MainPopup.module.scss';

const MainPopup = ({
  isOpened,
  onPrevArrowClick,
  title,
  onClose,
  className,
  children
}) => {
  return (
    <OverlayingPopup isOpened={isOpened} onClose={onClose}>
      <div className={[styles.container, className].join(' ')}>
        <Header
          onPrevArrowClick={onPrevArrowClick}
          title={title}
          onClose={onClose}
        />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </OverlayingPopup>
  )
}

export default MainPopup;