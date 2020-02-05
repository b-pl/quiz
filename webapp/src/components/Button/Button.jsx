import React from 'react'
import './Button.css'

function Button(props) {
  return(
    <div>
      <button type='button' className={props.styling}>{props.icon} {props.text}</button>
    </div>
  )
}

export default Button
