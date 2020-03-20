import React from 'react'
import { A } from 'hookrouter'
import './Endgame.css'
import Button from '../Button/Button'

function Endgame() {
  let score = localStorage.getItem('score')
  let player = localStorage.getItem('playerName')
  let correctAnswers = localStorage.getItem('correctAnswers')

  return(
    <div>
      <div className='endgame_wrapper'>
        <div className='header'>
          <span className='small-text'>Congratulations</span> <br />
          {player}

          <hr className='separator' />
        </div>
        <div className='content'>
          <p className='heading'>Your score:</p>
          <p className='underline big'>{score}</p>
          <p className='heading'>Correct answers:</p>
          <p className='big green'>{correctAnswers}</p>
          <p className='heading'>Wrong answers:</p>
          <p className='big red'>{10 - correctAnswers}</p>
        </div>
        <div className='btnFooter'>
          <A href='/categories'>
            <Button label='Again' styling='greenButton smaller' /></A>
          <A href='/'>  
            <Button label='Menu' styling='redButton smaller' /></A>
        </div>
      </div>
    </div>
  )
}

export default Endgame
