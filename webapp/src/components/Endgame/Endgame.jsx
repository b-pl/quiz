import React from 'react'
import { A } from 'hookrouter'

function Endgame() {
  let score = localStorage.getItem('score')

  return(
    <div>
      <h1>gratz!</h1>
      <h2>Your score: {score}</h2>
      <p><A href='/'>HOME</A></p>

    </div>
  )
}

export default Endgame
