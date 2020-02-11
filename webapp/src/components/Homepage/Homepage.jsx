import React from 'react'
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
  return(
    <div>
      <div className='homepage_wrapper'>
        {/* <h1>This is a HOMEPAGE</h1> */}
        <Topbar />
        <p><A href='/categories'>
          <Button label='New Game' styling='menuButton' icon={playIcon} /></A>
        </p>
        <p><A href='/highscores'>
          <Button label='Highscores' styling='menuButton' icon={highscoresIcon} /></A>
        </p>
        <p><A href='/statistics'>
          <Button label='Statistics' styling='menuButton' icon={statisticsIcon} /></A>
        </p>
        <p><A href='/question'>
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
        </p>
      </div>
    </div>
  )
}

export default Homepage
