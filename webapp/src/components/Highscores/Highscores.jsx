import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter'
import '../../css/RootStylesheet.css'
import './Highscores.css'
import host from '../../core/config'
import Button from '../Button/Button'

function Highscores() {
  const [highscores, setHighscores] = useState()

  useEffect(() => {
    fetch(`${host}/highscores`, {
      accept: 'application/json',
    })
      .then(res => res.json())
      .then(res => setHighscores(res))
  }, [])

  const displayHighscores = () => {
    return highscores && highscores.map((highscore, index) => (
      <div className='row'>
        <div className='column_1'>{index + 1}.</div>
        <div className='column_2'>{highscore.playerName}</div>
        <div className='column_3'>{highscore.score}</div>
        <div className='column_4'>{highscore.time}</div>
      </div>
    ))
  }

  return (
    <div>
      {/* {test()} */}
      <div className='wrapper'>
        <div className='header'>
          Highscores

          <hr className='separator' />
        </div>
        {displayHighscores()}

        <div className='button'>
          <A href='/'>
            <Button label='Menu' styling='redButton' icon='none' /></A>
        </div>
      </div>
    </div>
  )
}

export default Highscores
