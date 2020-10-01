import React from 'react'
import { useState } from 'react'
import './Transfer.css'

export default function Transfer(props) {
  const { data, value, onChange } = props
  const [source, setSource] = useState(
    data.filter(({ key }) => !value.includes(key))
  )
  const [target, setTarget] = useState(
    data.filter(({ key }) => value.includes(key))
  )
  const [selected, setSelected] = useState([])
  const srcFull = useState(false)
  const tarFull = useState(false)
  return (
    <div className="transfer">
      <List
        title="列表1"
        data={source}
        selected={selected}
        setSelected={setSelected}
        fullSelected={srcFull}
      ></List>
      <List
        title="列表2"
        data={target}
        selected={selected}
        setSelected={setSelected}
        fullSelected={tarFull}
      ></List>
      <button
        onClick={() => {
          const newTarget = [...target]
          selected.forEach((key) => {
            for (let item of source) {
              if (item.key === key) {
                newTarget.push(item)
              }
            }
          })
          const newSource = source.filter(({ key }) => {
            return !selected.includes(key)
          })
          const newSelected = []
          for (let item of target) {
            if (selected.includes(item.key)) {
              newSelected.push(item.key)
            }
          }
          setSource(newSource)
          setTarget(newTarget)
          setSelected(newSelected)
          srcFull[1](false)
        }}
      >
        to target
      </button>
      <button
        onClick={() => {
          const newSource = [...source]
          selected.forEach((key) => {
            for (let item of target) {
              if (item.key === key) {
                newSource.push(item)
              }
            }
          })
          const newTarget = target.filter(({ key }) => {
            return !selected.includes(key)
          })
          const newSelected = []
          for (let item of source) {
            if (selected.includes(item.key)) {
              newSelected.push(item.key)
            }
          }
          setSource(newSource)
          setTarget(newTarget)
          setSelected(newSelected)
          tarFull[1](false)
        }}
      >
        to source
      </button>
    </div>
  )
}

function List(props) {
  const { title, data, selected, setSelected, fullSelected } = props
  return (
    <div className="list">
      <div className="list-hd">{title}</div>
      <div className="list-bd">
        {data.map(({ key, label, disabled }) => {
          return (
            <Item
              key={key}
              label={label}
              disabled={disabled}
              selected={selected.includes(key)}
              setSelected={() => {
                if (selected.includes(key)) {
                  setSelected(selected.filter((oldKey) => oldKey != key))
                } else {
                  setSelected([...selected, key])
                }
              }}
            ></Item>
          )
        })}
      </div>
      <div className="list-bt">
        <Item
          label={`共${
            selected.length
              ? data.filter(({ key }) => selected.includes(key)).length + '/'
              : ''
          }${data.length}项`}
          setSelected={() => {
            let newSelected
            if (fullSelected[0]) {
              fullSelected[1](false)
              newSelected = []
              for (let key of selected) {
                let flag = true
                for (let item of data) {
                  if (item.key === key) {
                    flag = false
                    break
                  }
                }
                if (flag) {
                  newSelected.push(key)
                }
              }
            } else {
              fullSelected[1](true)
              newSelected = data
                .filter(({ disabled }) => {
                  return !disabled
                })
                .map(({ key }) => key)
              for (let key of selected) {
                let flag = true
                for (let item of data) {
                  if (item.key === key) {
                    flag = false
                    break
                  }
                }
                if (flag) {
                  newSelected.push(key)
                }
              }
            }
            setSelected(newSelected)
          }}
          selected={fullSelected[0]}
        ></Item>
      </div>
    </div>
  )
}

function Item(props) {
  const { label, disabled, selected, setSelected } = props
  return (
    <div
      className={`item ${disabled ? 'disabled' : ''} ${
        selected ? 'selected' : ''
      }`}
      onClick={() => (disabled ? null : setSelected())}
    >
      <div className="item-btn"></div>
      <div className="item-bdy">{label}</div>
    </div>
  )
}
