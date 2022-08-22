import styles from './ErrorList.module.scss';

export function ErrorList({ errors }) {
  if (errors === null) {
    return;
  }

  return (
    <ul className={styles['error-block']}>
      {Array.isArray(errors) ? (
        errors.map(({ param, msg }) => (
          <li className={styles['error-item']} key={param}>
            {msg}
          </li>
        ))
      ) : (
        <li className={styles['error-item']}>{errors.message}</li>
      )}
    </ul>
  );
}
