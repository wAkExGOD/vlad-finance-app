import React from 'react';

export function Button(props) {
  const variant = props.variant ? props.variant : 'contained';

  return (
    <button {...props} className={['btn', variant].join(' ')} type="button">
      {props.children}
    </button>
  );
}