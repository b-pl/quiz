import React from 'react'
import { A } from 'hookrouter'
import '../../css/RootStylesheet.css'
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
  let bestTime = localStorage.getItem('bestTime')
  let worstTime = localStorage.getItem('worstTime')

  return (
    <div>
      <div className='wrapper'>
        <div className='header'>
          <p className='heading'>{player}'s</p>
          <p className='heading'>Statistics</p>

          <hr className='separator-stats' />
        </div>
        <div className='statsContent'>
          <div className='statsContent-elem statsContent-elem--top'>
            <div className='statsContent-elem--header'>Games Played</div>
            <div className='statsContent-elem--stat'>{totalPlayed}</div>
          </div>
          <div className='statsContent-elem'>
            <div className='statsContent-elem--header'>Total Score</div>
            <div className='statsContent-elem--stat'>{totalScore}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-green'>
            <div className='statsContent-elem--header'>Correct Answers</div>
            <div className='statsContent-elem--stat'>{correctTotal}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-red'>
            <div className='statsContent-elem--header'>Wrong Answers</div>
            <div className='statsContent-elem--stat'>{wrongTotal}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-green'>
            <div className='statsContent-elem--header'>Best Score</div>
            <div className='statsContent-elem--stat'>{bestScore}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-red'>
            <div className='statsContent-elem--header'>Worst Score</div>
            <div className='statsContent-elem--stat'>{worstScore}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-green'>
            <div className='statsContent-elem--header'>Best Time</div>
            <div className='statsContent-elem--stat'>{bestTime}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-red'>
            <div className='statsContent-elem--header'>Worst Time</div>
            <div className='statsContent-elem--stat'>{worstTime}</div>
          </div>
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
