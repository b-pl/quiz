// CORE IMPORTS
import React from 'react'
import { A } from 'hookrouter'
// CSS IMPORTS
import '../../css/RootStylesheet.css'
// COMPONENTS IMPORTS
import Button from '../Button/Button'
// OTHER IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faQuestion, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
// VARIABLES
const movieIcon = <FontAwesomeIcon icon={faFilm} />
const gamepadIcon = <FontAwesomeIcon icon={faGamepad} />
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
          <Button label='...' styling='categoryButton' icon={questionMark} /></A>
        <A href='/categories'>
          <Button label='...' styling='categoryButton' icon={questionMark} /></A>
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
