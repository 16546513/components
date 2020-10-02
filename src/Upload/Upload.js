import React, { useCallback, useRef, useState } from 'react'
import './Upload.css'

const classNames = ['avatar-uploader', 'drag-uploader']

export default function Upload(props) {
  let { action, className, beforeUpload, onSuccess, drag } = props

  console.log('gg')
  if (!action) {
    throw Error('action属性是必要的！')
  }

  if (drag) {
    className = 'drag-uploader'
  }

  let inp = useRef(null)

  let [style, setStyle] = useState({})

  let onChange = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return
    if (beforeUpload(file)) {
      upload(action, file)
        .then((res) => {
          const url = URL.createObjectURL(file)
          setStyle({
            backgroundImage: 'url(' + url + ')',
            backgroundSize: '100% 100%',
          })
          return res
        })
        .then((res) => {
          onSuccess(res, file)
        })
        .catch((err) => console.log(err))
    }
  })

  return (
    <>
      {drag ? (
        <div
          className={className}
          draggable="true"
          style={style}
          onDragOver={(e) => {
            e.preventDefault()
          }}
          onDrop={(e) => {
            e.preventDefault()
            onChange({ target: { files: [e.dataTransfer.files[0]] } })
          }}
        ></div>
      ) : (
        <div
          className={className}
          onClick={() => {
            inp.current.click()
          }}
          style={style}
        >
          <input type="file" ref={inp} onChange={onChange} />
        </div>
      )}
    </>
  )
}

function upload(action, file) {
  return fetch(action, {
    method: 'post',
    body: file,
  })
}
