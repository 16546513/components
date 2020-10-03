import React from 'react'
import './App.css'
import Progress from './Progress/Progress.js'

function App() {
  return (
    <>
      <Progress type="circle" percentage={0} status="success"></Progress>
    </>
  )
}

export default App
