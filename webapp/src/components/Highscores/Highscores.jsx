// CORE IMPORTS
import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter'
// CSS IMPORTS
import '../../css/RootStylesheet.css'
import './Highscores.css'
// COMPONENTS IMPORTS
import Button from '../Button/Button'
// OTHER IMPORTS
import host from '../../core/config'

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
      <div key={index} className='highscores-content-row'>
        <div className='column_1'>{index + 1}.</div>
        <div className='column_2'>{highscore.playerName}</div>
        <div className='column_3'>{highscore.score}</div>
        <div className='column_4'>{highscore.time}s</div>
      </div>
    ))
  }

  return (
    <div>
      {/* {test()} */}
      <div className='wrapper space-around'>
        <div className='header'>
          Highscores

          <hr className='separator' />
        </div>
        <div className='highscores-content'>
          <div className='highscores-content-column--headers'>
            <div className='highscores-content-row highscores-content-row-headers'>
              <div className='column_1'>#</div>
              <div className='column_2'>Name</div>
              <div className='column_3'>Score</div>
              <div className='column_4'>Time</div>
            </div>
          </div>
          <div className='highscores-content-column--stats'>
            {displayHighscores()}
          </div>
        </div>

        <div className='button'>
          <A href='/'>
            <Button label='Menu' styling='redButton' icon='none' /></A>
        </div>
      </div>
    </div>
  )
}

export default Highscores
