import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter'

function Highscores() {
  const [highscores, setHighscores] = useState()

useEffect(() => {
  fetch(`http://localhost:3001/highscores`, {
    accept: 'application/json',
  })
  .then(res => res.json())
  .then(res => setHighscores(res))
}, [])

const mapHighscores = () => {
  return highscores && highscores.map(highscore => (
    <div>
      <p>{highscore.playerName}</p>
      <p>{highscore.score}</p>
      <p>{highscore.time}</p>
    </div>
  ))
}

  return(
    <div>

    </div>
  )
}

export default Highscores
