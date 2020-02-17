import React from 'react'
import { A } from 'hookrouter'
import Button from '../Button/Button'
import './Categories.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
const playIcon = <FontAwesomeIcon icon={faPlay} />


function Categories() {
  return(
    <div>
      <div className='categories_wrapper'>
        <div className='header'>
          Choose category
  
          <hr className='separator' />
        </div>
        <A href='/categories'>
          <Button label='Category 1' styling='categoryButton' icon={playIcon} /></A>
        <A href='/categories'>
          <Button label='Category 2' styling='categoryButton' icon={playIcon} /></A>
        <A href='/categories'>
          <Button label='Category 3' styling='categoryButton' icon={playIcon} /></A>
        <A href='/categories'>
          <Button label='Category 4' styling='categoryButton' icon={playIcon} /></A>
        <A href='/categories'>
          <Button label='Category 5' styling='categoryButton' icon={playIcon} /></A>
        <A href='/categories'>
          <Button label='Cat 6' styling='categoryButton' icon={playIcon} /></A>
        <A href='/'>
          <Button label='Back' styling='redButton' icon={playIcon} /></A>
      </div>
    </div>
  )
}

export default Categories
