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

const translations = {
  pl: {
    highscores: 'Wyniki',
    name: 'Imię',
    score: 'Wynik',
    time: 'Czas'
  },
  en: {
    highscores: 'Highscores',
    name: 'Name',
    score: 'Score',
    time: 'Time'
  }
}

function Highscores() {
  const [highscores, setHighscores] = useState()
  const [translation, setTranslation] = useState({ ...translations.en })

  useEffect(() => {
    fetch(`${host}/highscores`, {
      accept: 'application/json',
    })
      .then(res => res.json())
      .then(res => setHighscores(res))
  }, [])

  // Set set language
  useEffect(() => {
    if (localStorage.getItem('lang') === 'en') return setTranslation({ ...translations.en })
    else return setTranslation({ ...translations.pl })
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
          {translation.highscores}

          <hr className='separator' />
        </div>
        <div className='highscores-content'>
          <div className='highscores-content-column--headers'>
            <div className='highscores-content-row highscores-content-row-headers'>
              <div className='column_1'>#</div>
              <div className='column_2'>{translation.name}</div>
              <div className='column_3'>{translation.score}</div>
              <div className='column_4'>{translation.time}</div>
            </div>
          </div>
          <div className='highscores-content-column--stats'>
            {displayHighscores()}
          </div>
        </div>

        <div className='button'>
          <A href='/home'>
            <Button label='Menu' styling='redButton' icon='none' /></A>
        </div>
      </div>
    </div>
  )
}

export default Highscores
