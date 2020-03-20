import React from 'react'
import './Button.css'

function Button(props) {
  if (props.icon === 'none') {
    return (
      <div>
        <button type='button' className={props.styling} id={props.id} onClick={props.onClick}>
          <span className='label'>{props.label}</span>
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button type='button' className={props.styling} id={props.id} onClick={props.onClick}>
          <span className='icon'>{props.icon && props.icon}</span>
          <span className='label'>{props.label}</span>
        </button>
      </div>
    )
  }
}

export default Button
