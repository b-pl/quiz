import React from 'react'
import './Button.css'

function Button(props) {
  return(
    <div>
      <button type='button' className={props.styling}>
        <span className='icon'>{props.icon && props.icon}</span>
        <span className='label'>{props.label}</span>
      </button>
    </div>
  )
}

export default Button
