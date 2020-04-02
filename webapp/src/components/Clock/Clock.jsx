import React from 'react'
import { useState, useEffect } from 'react'

function Clock(){
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => { setTime(prevTime => prevTime + 1) }, 1000)
    return (() => {clearInterval(timer); localStorage.setItem('time', time)})
  })

  return(
    <div>
      {/* 'Shadow' component, it saves time to localStorage */}
    </div>
  )
}

export default Clock
