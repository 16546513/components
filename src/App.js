import React from 'react'
import './App.css'
import Rate from './Rate/Rate.js'

function App() {
  return <Rate showText allowHalf onChange={(inx) => console.log(inx)}></Rate>
}

export default App
