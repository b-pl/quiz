// CORE IMPORTS
import React from 'react'
import { useState, useEffect } from 'react'
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
// TRANSLATION
const translations = {
  pl: {
    chooseCategory: 'Wybierz kategorię',
    movies: 'Filmy',
    games: 'Gry',
  },
  en: {
    chooseCategory: 'Choose category',
    movies: 'Movies',
    games: 'Games',
  }
}

function Categories() {
  const [lang] = useState(localStorage.getItem('lang'))
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
          {translation.chooseCategory}
  
          <hr className='separator' />
        </div>
        <A href={'/question/Movies/' + lang}>
          <Button label={translation.movies} styling='categoryButton' icon={movieIcon} /></A>
        <A href={'/question/Games/' + lang}>
          <Button label={translation.games} styling='categoryButton' icon={gamepadIcon} /></A>
        <A href='/categories'>
          <Button label='...' styling='categoryButton' icon={questionMark} /></A>
        <A href='/categories'>
          <Button label='...' styling='categoryButton' icon={questionMark} /></A>
        <A href='/categories'>
          <Button label='...' styling='categoryButton' icon={questionMark} /></A>
        <A href='/categories'>
          <Button label='...' styling='categoryButton' icon={questionMark} /></A>
          
        <A href='/home'>
          <Button label='Menu' styling='redButton' icon={backIcon} /></A>
      </div>
    </div>
  )
}

export default Categories
