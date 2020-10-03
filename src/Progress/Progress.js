import React from 'react'

import './Progress.css'

const statuses = ['success', 'exception']

export default function Progress(props) {
  let {
    type = 'line',
    percentage = 0,
    strokeWidth = 6,
    textInside = false,
    width = 126,
    showText = true,
    status,
  } = props

  let innerBarClass = 'progress-bar'
  if (statuses.includes(status)) {
    innerBarClass += ' progress-bar--' + status
  } else {
    innerBarClass += ' progress-bar--normal'
  }

  let borderRadius = strokeWidth / 2 + 'px'

  let deg, leftStyle, rightStyle
  if (type === 'circle') {
    deg = toDeg(percentage)
    leftStyle = {}
    rightStyle = {}
    if (0 <= deg && deg <= 180) {
      rightStyle.transform = 'rotate(' + deg + 'deg)'
    } else {
      leftStyle.transform = 'rotate(' + (deg - 180) + 'deg)'
      rightStyle.backgroundColor = statuses.includes(status)
        ? status === 'success'
          ? '#13ce66'
          : ' #ff4949'
        : '#20a0ff'
    }
  }

  return (
    <>
      {type === 'line' ? (
        <div className="progress-wrapper">
          <div
            className="progress--line"
            style={{
              height: strokeWidth + 'px',
              borderRadius,
            }}
          >
            <div
              className={innerBarClass}
              style={{
                width: percentage + '%',
                borderRadius,
                fontSize: strokeWidth + 'px',
                lineHeight: strokeWidth + 'px',
              }}
            >
              {textInside && showText ? `${percentage}%` : null}
            </div>
          </div>
          {textInside && showText ? null : `${percentage}%`}
        </div>
      ) : (
        <div
          className={`progress--circle progress--circle--${
            statuses.includes(status) ? status : 'normal'
          }`}
          style={{ width: width + 'px', height: width + 'px' }}
        >
          <div
            className="progress-circle-left"
            style={{
              borderTopLeftRadius: width / 2 + 'px',
              borderBottomLeftRadius: width / 2 + 'px',
              ...leftStyle,
            }}
          ></div>
          <div
            className="progress-circle-right"
            style={{
              borderTopRightRadius: width / 2 + 'px',
              borderBottomRightRadius: width / 2 + 'px',
              ...rightStyle,
            }}
          ></div>
          <div
            className="progress-circle-inner"
            style={{
              width: width - strokeWidth + 'px',
              height: width - strokeWidth + 'px',
            }}
          >
            {showText ? percentage + '%' : ''}
          </div>
        </div>
      )}
    </>
  )
}

function toDeg(percent) {
  return 360 * (percent / 100)
}
