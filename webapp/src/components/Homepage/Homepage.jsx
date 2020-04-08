// CORE IMPORTS
import React, { useState, useEffect } from 'react'
import { navigate, A } from 'hookrouter'
// CSS IMPORTS
import '../../css/RootStylesheet.css'
import './Homepage.css'
// COMPONENTS IMPORTS
import Button from '../Button/Button'
// OTHER IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faTrophy, faChartLine } from '@fortawesome/free-solid-svg-icons'
// VARIABLES
const playIcon = <FontAwesomeIcon icon={faPlay} />
const highscoresIcon = <FontAwesomeIcon icon={faTrophy} />
const statisticsIcon = <FontAwesomeIcon icon={faChartLine} />
// TRANSLATION
const translations = {
  pl: {
    welcome: 'Witaj',
    play: 'Graj',
    scores: 'Wyniki',
    stats: 'Statystyki'
  },
  en: {
    welcome: 'Welcome',
    play: 'Play',
    scores: 'Scores',
    stats: 'Stats'
  }
}

function Homepage() {
  // HOOKS
  const [playerName, setPlayerName] = useState('')
  const [playerStats, setPlayerStats] = useState()
  const [translation, setTranslation] = useState({ ...translations.en })

  // Change this string every time, Player changes name
  useEffect(() => {
    setPlayerStats(playerName + 'stats')
  }, [playerName])

  // Set set language
  useEffect(() => {
    if (localStorage.getItem('lang') === 'en') return setTranslation({ ...translations.en })
    else return setTranslation({ ...translations.pl })
  }, [])

  const validatePlayerName = () => {
    const playerName = document.querySelector('.playerName').value

    if (playerName.length <= 2) {
      setTimeout(() => document.querySelector('.playerName').focus(), 1)
      alert('Name must contain 2-8 characters (only alphanumeric symbols)')
    } else {
      if (!localStorage.getItem(playerStats)) setStatistics()
    }
  }

  const handleInputChange = (e) => {
    const target = e.target
    const value = target.value

      setPlayerName(value)
      localStorage.setItem('playerName', value)
  }

  // Component did mount...
  useEffect(() => {
    // If there's no playerName in localStorage
    // Set name to PLAYER
    if (localStorage.getItem('playerName')) {
      setPlayerName(localStorage.getItem('playerName'))
    } else {
      setPlayerName('PLAYER')
      localStorage.setItem('playerName', 'PLAYER')
    }
  }, [])

  const setStatistics = () => {
    let cleanStatistics = {
      totalPlayed: 0,
      correctTotal: 0,
      wrongTotal: 0,
      totalScore: 0,
      bestScore: 0,
      worstScore: 0,
      bestTime: 0,
      worstTime: 0,
    }
    localStorage.setItem(playerStats, JSON.stringify(cleanStatistics))
  }

  // Force player to change name
  const validateGameStart = () => {
    if (!localStorage.getItem('playerName') || localStorage.getItem('playerName') === 'PLAYER') {
      alert('Please change Player Name')
    } else {
      return navigate('/categories', true)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') document.querySelector('.playerName').blur()
  }

  return(
    <div>
      <div className='wrapper'>
        {/* Header message */}
        <div className='header'>
          {translation.welcome}
          <input className='playerName' type='text' maxLength='8'
            onChange={handleInputChange} onKeyPress={handleKeyPress} onBlur={validatePlayerName} value={playerName}/>

          <hr className='separator' />
        </div>
        
        {/* Buttons */}
          <Button label={translation.play} styling='menuButton' id='newGame' icon={playIcon} onClick={validateGameStart} />
        <A href='/highscores'> 
          <Button label={translation.scores} styling='menuButton' icon={highscoresIcon} /></A>
        <A href='/statistics'>
           <Button label={translation.stats} styling='menuButton' icon={statisticsIcon} /></A>
      </div>
    </div>
  )
}

export default Homepage
