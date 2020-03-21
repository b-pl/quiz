import React from 'react'
import { A } from 'hookrouter'
import './Statistics.css'
import Button from '../Button/Button'

function Statistics() {
  let player = localStorage.getItem('playerName')
  let totalPlayed = localStorage.getItem('totalPlayed')
  let correctTotal = localStorage.getItem('correctTotal')
  let wrongTotal = localStorage.getItem('wrongTotal')
  let totalScore = localStorage.getItem('totalScore')
  let bestScore = localStorage.getItem('bestScore')
  let worstScore = localStorage.getItem('worstScore')

  return (
    <div>
      <div className='statistics_wrapper'>
        <div className='header'>
          <p className='heading'>{player}'s</p>
          <p className='heading'>Statistics</p>

          <hr className='separator' />
        </div>
        <div className='statsContent'>
          <p>Games played: {totalPlayed}</p>
          <p>Correct answers total: {correctTotal}</p>
          <p>Wrong answers total: {wrongTotal}</p>
          <p>Total score: {totalScore}</p>
          <p>Best score: {bestScore}</p>
          <p>Worst score: {worstScore}</p>
        </div>
        <div className='button'>
          <A href='/'>
            <Button label='Menu' styling='redButton smaller' icon='none' /></A>
        </div>
      </div>
    </div>
  )
}

export default Statistics
