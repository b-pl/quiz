// CORE IMPORTS
import React from 'react'
import { useState, useEffect } from 'react'
import { A } from 'hookrouter'
// CSS IMPORTS
import '../../css/RootStylesheet.css'
import './Endgame.css'
// COMPONENTS IMPORTS
import Button from '../Button/Button'
// TRANSLATION
const translations = {
  pl: {
    grats: 'Gratulacje',
    score: 'Twój wynik',
    correctAns: 'Dobrych odp.',
    wrongAns: 'Złych odp.',
    again: 'Powtórz'
  },
  en: {
    grats: 'Congratulations',
    score: 'Your score',
    correctAns: 'Correct answers',
    wrongAns: 'Wrong answers',
    again: 'Again'
  }
}

function Endgame() {
  let score = localStorage.getItem('score')
  let player = localStorage.getItem('playerName')
  let correctAnswers = localStorage.getItem('correctAnswers')
  const [translation, setTranslation] = useState({ ...translations.en })

  // Set set language
  useEffect(() => {
    if (localStorage.getItem('lang') === 'en') return setTranslation({ ...translations.en })
    else return setTranslation({ ...translations.pl })
  }, [])

  return(
    <div>
      <div className='wrapper'>
        <div className='header'>
          <span className='small-text'>{translation.grats}</span> <br />
          {player}

          <hr className='separator' />
        </div>
        <div className='content'>
          <p className='heading'>{translation.score}:</p>
          <p className='underline big'>{score}</p>
          <p className='heading'>{translation.correctAns}:</p>
          <p className='big green'>{correctAnswers}</p>
          <p className='heading'>{translation.wrongAns}:</p>
          <p className='big red'>{10 - correctAnswers}</p>
        </div>
        <div className='btnFooter'>
          <A href='/categories'>
            <Button label={translation.again} styling='greenButton smaller' icon='none' /></A>
          <A href='/home'>  
            <Button label='Menu' styling='redButton smaller' icon='none' /></A>
        </div>
      </div>
    </div>
  )
}

export default Endgame
