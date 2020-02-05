import React from 'react'
import { A } from 'hookrouter'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faTrophy, faChartLine } from '@fortawesome/free-solid-svg-icons'

const playIcon = <FontAwesomeIcon icon={faPlay} />
const highscoresIcon = <FontAwesomeIcon icon={faTrophy} />
const statisticsIcon = <FontAwesomeIcon icon={faChartLine} />

function Homepage() {
  return(
    <div>
      <h1>This is a HOMEPAGE</h1>
      <p><A href='/categories'>
        <Button text='New Game' styling='menuButton' icon={playIcon} /></A>
      </p>
      <p><A href='/highscores'>
        <Button text='Highscores' styling='menuButton' icon={highscoresIcon} /></A>
      </p>
      <p><A href='/statistics'>
        <Button text='Statistics' styling='menuButton' icon={statisticsIcon} /></A>
      </p>
      <p><A href='/question'>question</A></p>
      <p><A href='/answer'>answer</A></p>
      <p><A href='/endgame'>endgame</A></p>
    </div>
  )
}

export default Homepage
