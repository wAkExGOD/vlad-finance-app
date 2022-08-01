import React from 'react';
import styles from './Button.module.scss';

export function Button(props) {
  const variant = props.variant ? props.variant : 'contained' // contained | outlined;

  return (
    <button {...props} className={[styles.btn, styles[variant], props.className].join(' ')} type="button">
      {props.children}
    </button>
  );
}