import React from 'react'
import { A } from 'hookrouter'

function Homepage() {
  return(
    <div>
      <h1>This is a HOMEPAGE</h1>
      <p><A href='/highscores'>Highscores</A></p>
      <p><A href='/statistics'>statistics</A></p>
      <p><A href='/categories'>categories</A></p>
      <p><A href='/question'>question</A></p>
      <p><A href='/answer'>answer</A></p>
      <p><A href='/endgame'>endgame</A></p>
    </div>
  )
}

export default Homepage
