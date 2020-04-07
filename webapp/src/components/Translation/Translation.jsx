// CORE IMPORTS
import React from 'react'
// CSS IMPORTS
import '../../css/RootStylesheet.css'
import { navigate } from 'hookrouter'

function Translation() {

  const setTranslation = (e) => {
    localStorage.setItem('lang', e.target.value)
    navigate('/', true)
  }

  return(
    <div>
      <div className='wrapper'>
        <button value='pl' onClick={setTranslation}>PL</button>
        <button value='en' onClick={setTranslation}>EN</button>
      </div>
    </div>
  )
}

export default Translation
