import React from 'react'
import { A } from 'hookrouter'
import Button from '../Button/Button'
import '../../css/RootStylesheet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons'
import { faGrinSquintTears, faQuestion, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

// Icons for buttons
const movieIcon = <FontAwesomeIcon icon={faFilm} />
const gamepadIcon = <FontAwesomeIcon icon={faGamepad} />
const musicIcon = <FontAwesomeIcon icon={faMusic} />
const memesIcon = <FontAwesomeIcon icon={faGrinSquintTears} />
const backIcon = <FontAwesomeIcon icon={faArrowAltCircleLeft} />
const questionMark = <FontAwesomeIcon icon={faQuestion} />

function Categories() {
  return(
    <div>
      <div className='wrapper'>
        <div className='header'>
          Choose category
  
          <hr className='separator' />
        </div>
        <A href='/question/Movies'>
          <Button label='Movies' styling='categoryButton' icon={movieIcon} /></A>
        <A href='/question/Games'>
          <Button label='Games' styling='categoryButton' icon={gamepadIcon} /></A>
        <A href='/categories'>
          <Button label='Music' styling='categoryButton' icon={musicIcon} /></A>
        <A href='/categories'>
          <Button label='Memes' styling='categoryButton' icon={memesIcon} /></A>
        <A href='/categories'>
          <Button label='...' styling='categoryButton' icon={questionMark} /></A>
        <A href='/categories'>
          <Button label='...' styling='categoryButton' icon={questionMark} /></A>
          
        <A href='/'>
          <Button label='Back' styling='redButton' icon={backIcon} /></A>
      </div>
    </div>
  )
}

export default Categories
