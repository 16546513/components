import React from 'react'

import './Badge.css'

export default function Badge(props) {
  let { value, max, isDot } = props
  if (typeof max === 'number' && typeof value === 'number' && value > max) {
    value = max + '+'
  }
  return (
    <div className="badge">
      {props.children}
      <div className={`badge--value ${isDot ? 'badge--dot' : ''}`}>{value}</div>
    </div>
  )
}
