import React, { useEffect, useState } from 'react'
import './Rate.css'

const texts = ['极差', '失望', '一般', '满意', '惊喜']

export default function Rate(props) {
  let { onChange, showText, allowHalf } = props
  let rates = [1, 2, 3, 4, 5]
  let [inx, setInx] = useState(-1)
  let [isHalf, setIsHalf] = useState(false)
  useEffect(() => {
    onChange && onChange(inx + 1)
  }, [inx])

  return (
    <div
      className="rate"
      onMouseLeave={() => {
        setInx(-1)
      }}
    >
      {rates.map((r, i) => {
        let className = 'rate-star'
        if (inx >= i) {
          className += ' rate-selected'
        }
        let style = { display: 'none' }
        if (inx == i && isHalf) {
          style = {}
        }
        return (
          <div
            className={className}
            key={r}
            onMouseMove={(e) => {
              if (allowHalf) {
                let x = e.nativeEvent.offsetX
                if (x <= 10) {
                  setIsHalf(true)
                } else {
                  setIsHalf(false)
                }
              }
              setInx(i)
            }}
          >
            {allowHalf ? (
              <div
                className="rate-half"
                style={style}
                onMouseOver={() => setIsHalf(false)}
              ></div>
            ) : null}
          </div>
        )
      })}
      {showText && inx > -1 ? texts[inx] : null}
    </div>
  )
}
