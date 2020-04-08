// CORE IMPORTS
import React from 'react'
import { navigate } from 'hookrouter'
// CSS IMPORTS
import '../../css/RootStylesheet.css'
import './Translation.css'
// IMAGES IMPORTS
import flagPL from '../../images/pl.png'
import flagEN from '../../images/gb.png'

function Translation() {

  const setTranslation = (e) => {
    localStorage.setItem('lang', e.target.alt)
    navigate('/home', true)
  }

  return(
    <div>
      <div className='wrapper space-evenly'>
        <div className='flag'>
          <img src={flagPL} className='flag-png' alt='pl' onClick={setTranslation} />
        </div>
        <div className='flag' value='en' onClick={setTranslation}>
          <img src={flagEN} value='en' className='flag-png' alt='en' onClick={setTranslation} />
        </div>
      </div>
    </div>
  )
}

export default Translation
