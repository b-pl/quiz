import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter'
import Button from '../Button/Button'
// import Topbar from '../Topbar/Topbar'
import '../../css/RootStylesheet.css'
import './Homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faTrophy, faChartLine } from '@fortawesome/free-solid-svg-icons'
// import { faArrowAltCircleLeft, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
// import { faVideo, faGamepad } from '@fortawesome/free-solid-svg-icons'

const playIcon = <FontAwesomeIcon icon={faPlay} />
const highscoresIcon = <FontAwesomeIcon icon={faTrophy} />
const statisticsIcon = <FontAwesomeIcon icon={faChartLine} />
// const backIcon = <FontAwesomeIcon icon={faArrowAltCircleLeft} />
// const againIcon = <FontAwesomeIcon icon={faRedoAlt} />
// const movieIcon = <FontAwesomeIcon icon={faVideo} />
// const gamesIcon = <FontAwesomeIcon icon={faGamepad} />

function Homepage() {
  // HOOKS
  const [playerName, setPlayerName] = useState('')
  const [nameInput] = useState(React.createRef())

  const validatePlayerName = () => {
    const playerName = document.querySelector('.playerName').value

    if (playerName.length >= 2 && !(/\W/.test(playerName))) {
      return document.querySelector('#newGame').disabled = false
    } else {
      setTimeout(() => document.querySelector('.playerName').focus(), 1)
      alert('Name must contain 2-8 characters (only alphanumeric symbols)')
      return document.querySelector('#newGame').disabled = true
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
    if (localStorage.getItem('playerName')) {
      setPlayerName(localStorage.getItem('playerName'))
    } else {
      setPlayerName('PLAYER')
    }

    if (!localStorage.getItem('totalPlayed')) {
      localStorage.setItem('totalPlayed', 0)
      localStorage.setItem('correctTotal', 0)
      localStorage.setItem('wrongTotal', 0)
      localStorage.setItem('totalScore', 0)
      localStorage.setItem('bestScore', 0)
      localStorage.setItem('worstScore', 0)
      localStorage.setItem('bestTime', 0)
      localStorage.setItem('worstTime', 0)
    }
  }, [])

  return(
    <div>
      <div className='wrapper'>
        {/* Header message */}
        <div className='header'>
          Welcome
          <input ref={nameInput} className='playerName' type='text' maxLength='8'
            onChange={handleInputChange} onBlur={validatePlayerName} value={playerName}/>

          <hr className='separator' />
        </div>
        
        {/* Buttons */}
        <A href='/categories'>
          <Button label='New Game' styling='menuButton' id='newGame' icon={playIcon} /></A>
        <A href='/highscores'>
          <Button label='Highscores' styling='menuButton' icon={highscoresIcon} /></A>
        <A href='/statistics'>
          <Button label='Statistics' styling='menuButton' icon={statisticsIcon} /></A>
      </div>
    </div>
  )
}

export default Homepage
