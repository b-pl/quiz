// CORE IMPORTS
import React from 'react'
import { useState, useEffect } from 'react'

function Clock(){
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => { setTime(prevTime => prevTime + 0.01) }, 1)
    return (() => {clearInterval(timer); localStorage.setItem('time', time.toPrecision(3)/2)})
  })

  return(
    <div>
      {/* 'Shadow' component, it saves time variable to localStorage */}
    </div>
  )
}

export default Clock
