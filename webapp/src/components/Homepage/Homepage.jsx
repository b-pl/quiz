import React, { useState } from 'react'
import { A } from 'hookrouter'
import Button from '../Button/Button'
import Topbar from '../Topbar/Topbar'
import './Homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faTrophy, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleLeft, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { faVideo, faGamepad } from '@fortawesome/free-solid-svg-icons'

const playIcon = <FontAwesomeIcon icon={faPlay} />
const highscoresIcon = <FontAwesomeIcon icon={faTrophy} />
const statisticsIcon = <FontAwesomeIcon icon={faChartLine} />
const backIcon = <FontAwesomeIcon icon={faArrowAltCircleLeft} />
const againIcon = <FontAwesomeIcon icon={faRedoAlt} />
const movieIcon = <FontAwesomeIcon icon={faVideo} />
const gamesIcon = <FontAwesomeIcon icon={faGamepad} />

function Homepage() {
  const [playerName, setPlayerName] = useState('PLAYER')
  return(
    <div>
      <div className='homepage_wrapper'>
        {/* TopBar Component */}
        {/* <Topbar /> */}

        {/* Header message */}
        <div data-testid='header' className='header'>
          Welcome 
          <span className='playerName' onClick={() => setPlayerName('123')}>{playerName}</span>
          <hr className='separator' />
        </div>

        {/* Buttons */}
        <A href='/categories'>
          <Button label='New Game' styling='menuButton' icon={playIcon} /></A>
        <A href='/highscores'>
          <Button label='Highscores' styling='menuButton' icon={highscoresIcon} /></A>
        <A href='/statistics'>
          <Button label='Statistics' styling='menuButton' icon={statisticsIcon} /></A>
      </div>
    </div>
  )
}

export default Homepage

{/* <p><A href='/question'>
          <Button label='Back' styling='redButton' icon={backIcon} /></A>
        </p>
        <p><A href='/answer'>
          <Button label='Again' styling='greenButton' icon={againIcon} /></A>
        </p>
        <p><A href='/endgame'>
          <Button label='Movies' styling='categoryButton' icon={movieIcon} /></A>
        </p>
        <p><A href='/endgame'>
          <Button label='Games' styling='categoryButton' icon={gamesIcon} /></A>
        </p> */}