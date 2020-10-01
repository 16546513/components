import React from 'react'
import './Button.css'

const types = ['primary', 'text', 'success', 'warning', 'danger', 'info']
const sizes = ['large', 'small', 'mini']

export default function Button(props) {
  let { type, children, disabled, loading, size } = props

  let className = 'button'

  if (types.includes(type)) {
    className += ' button--' + type
  }

  disabled = Boolean(disabled)
  if (disabled) {
    className += ' button--disabled'
  }

  loading = Boolean(loading)
  if (loading) {
    className += ' button--loading'
  }

  if (sizes.includes(size)) {
    className += ' button--' + size
  }

  return (
    <button className={className}>
      {loading ? '⚪' : null}
      {children}
    </button>
  )
}
