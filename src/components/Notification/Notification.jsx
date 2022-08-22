import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Notification.module.scss';

// const appRoot = document.getElementById('app-root');
const notificationsRoot = document.getElementById('notifications-root');

export function Notification(props) {
  // status: 'success'|'error'|'warning'|'info';
  const [isShown, setIsShown] = useState(true);
  const { text = '...', status = 'success', time = 2 } = props;

  // const notification = 
  //   <div
  //     className={[styles.notify, styles[status]].join(' ')}
  //     onClick={() => setIsShown(false)}>
  //     {text}
  //   </div>;
  const notification = document.createElement('div');
  notification.classList = [styles.notify, styles[status]].join(' ');
  notification.textContent = text;

  const removeNotify = () => {
    notificationsRoot.removeChild(notification);
    notification.removeEventListener('click', removeNotify);
  };
  const appendNotify = () => {
    notificationsRoot.appendChild(notification)
    notification.addEventListener('click', removeNotify);
  };
  // const appendNotify = notificationsRoot.appendChild(notification);

  useEffect(() => {
    appendNotify();
    setTimeout(() => removeNotify(), time * 1000);

    return () => {
      removeNotify();
    }
  }, []);

  console.log('render notification');

  return createPortal(props.children, notification);
}