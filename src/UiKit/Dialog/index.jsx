import OverlayingPopup from '../OverlayingPopup';
import Button from '../Button';
import styles from '../MainPopup/MainPopup.module.scss';

const Dialog = ({
  children,
  isOpened,
  onClose,
  text,
  primaryButtonText,
  primaryButtonOnClick,
  secondaryButtonText,
  secondaryButtonOnClick,
}) => {
  return (
    <OverlayingPopup isOpened={isOpened} onClose={onClose}>
      <div className={styles.container}>
        <div>{text}</div>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.btns}>
          {primaryButtonText && <Button onClick={primaryButtonOnClick}>{primaryButtonText}</Button>}
          {secondaryButtonText && <Button onClick={secondaryButtonOnClick}>{secondaryButtonText}</Button>}
        </div>
      </div>
    </OverlayingPopup>
  );
};

export default Dialog;
