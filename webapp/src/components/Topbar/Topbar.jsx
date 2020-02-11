import React from 'react'
import './Topbar.css'

function Topbar() {
  return(
    <div>
      <div className='topbar_wrapper'>
        {/* Topbar will get score and question no from Redux (probably)*/}
        <span className='score'>Score: 123</span>
        <span className='question'>1/10</span>
      </div>
    </div>
  )
}

export default Topbar
