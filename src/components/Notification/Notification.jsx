import { useState, useEffect } from 'react';

import styles from './Notification.module.scss';

export function Notification(props) {
  // status: 'success'|'error'|'warning'|'info';
  const [isShown, setIsShown] = useState(true);
  const { text = '...', status = 'success', time = 2 } = props;

  useEffect(() => {
    setTimeout(() => isShown && setIsShown(false), time * 1000);
  }, []);

  return isShown &&
    <div
      className={[styles.notify, styles[status]].join(' ')}
      onClick={() => setIsShown(false)}>
      {text}
    </div>;
}
