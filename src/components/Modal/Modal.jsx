import React from 'react';

import styles from './Modal.module.scss';

export function Modal({ active, setActive, children }) {
  return (
    <div className={[styles.modal, active ? styles.active : null].join(' ')} onClick={() => setActive(false)}>
      <div className={[styles.modal__content, active ? styles.active : null].join(' ')} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}