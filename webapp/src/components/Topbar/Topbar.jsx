import React from 'react'
import './Topbar.css'

function Topbar(props) {
  let currentScore = props.score
  let questionNumber = props.question
  return(
    <div>
      <div className='topbar_wrapper'>
        <span className='score'>Score: {currentScore}</span>
        <span className='question'>{questionNumber}/10</span>
      </div>
    </div>
  )
}

export default Topbar
