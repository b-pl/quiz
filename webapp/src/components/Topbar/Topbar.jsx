// CORE IMPORTS
import React from 'react'
import { useState, useEffect } from 'react'
// CSS IMPORTS
import './Topbar.css'
// TRANSLATION
const translations = {
  pl: {
    score: 'Wynik',

  },
  en: {
    score: 'Score',
  }
}

function Topbar(props) {
  let currentScore = props.score
  let questionNumber = props.question
  const [translation, setTranslation] = useState({ ...translations.en })

  // Set set language
  useEffect(() => {
    if (localStorage.getItem('lang') === 'en') return setTranslation({ ...translations.en })
    else return setTranslation({ ...translations.pl })
  }, [])

  return(
    <div>
      <div className='topbar_wrapper'>
        <span className='score'>{translation.score}: {currentScore}</span>
        <span className='question'>{questionNumber}/10</span>
      </div>
    </div>
  )
}

export default Topbar
