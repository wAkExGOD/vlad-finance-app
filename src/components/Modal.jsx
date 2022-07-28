import React from 'react'

export function Modal({ active, setActive, children }) {
  return (
    <div className={['modal', active ? 'active' : null].join(' ')} onClick={() => setActive(false)}>
      <div className={['modal__content', active ? 'active' : null].join(' ')} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}