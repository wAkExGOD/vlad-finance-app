import React from 'react';
import Spinner from '../Spinner';
import styles from './Button.module.scss';

export default function Button(props) {

  let { variant, className, isLoading, children, ...restProps } = props;
  variant = props.variant ? props.variant : 'contained'; // contained | outlined;

  return (
    <button type="button" {...restProps} className={[styles.btn, styles[variant], className].join(' ')}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
}