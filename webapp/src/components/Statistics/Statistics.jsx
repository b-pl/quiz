// CORE IMPORTS
import React from 'react'
import { A } from 'hookrouter'
import { useState } from 'react'
// CSS IMPORTS
import '../../css/RootStylesheet.css'
import './Statistics.css'
import '../Button/Button.css'
// COMPONENTS IMPORTS
import Button from '../Button/Button'

function Statistics() {
  const [player] = useState(localStorage.getItem('playerName') + 'stats')
  const [playerStatistics, setPlayerStatistics] = useState(JSON.parse(localStorage.getItem(player)))
  const [playerName] = useState(localStorage.getItem('playerName'))

  const clearStatistics = () => {
    let player = localStorage.getItem('playerName') + 'stats'
    let cleanStatistics = {
      totalPlayed: 0,
      correctTotal: 0,
      wrongTotal: 0,
      totalScore: 0,
      bestScore: 0,
      worstScore: 0,
      bestTime: 0,
      worstTime: 0,
    }
    localStorage.setItem(player, JSON.stringify(cleanStatistics))

    setPlayerStatistics(JSON.parse(localStorage.getItem(player)))
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='header'>
          <p className='heading'>{playerName}'s</p>
          <p className='heading'>Statistics</p>

          <hr className='separator-stats' />
        </div>
        <div className='statsContent'>
          <div className='statsContent-elem statsContent-elem--noheight'>
            <button className='clearButton' onClick={clearStatistics}>Clear statistics</button>
          </div>
          <div className='statsContent-elem'>
            <div className='statsContent-elem--header'>Games Played</div>
            <div className='statsContent-elem--stat'>{playerStatistics.totalPlayed}</div>
          </div>
          <div className='statsContent-elem'>
            <div className='statsContent-elem--header'>Total Score</div>
            <div className='statsContent-elem--stat'>{playerStatistics.totalScore}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-green'>
            <div className='statsContent-elem--header'>Correct Answers</div>
            <div className='statsContent-elem--stat'>{playerStatistics.correctTotal}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-red'>
            <div className='statsContent-elem--header'>Wrong Answers</div>
            <div className='statsContent-elem--stat'>{playerStatistics.wrongTotal}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-green'>
            <div className='statsContent-elem--header'>Best Score</div>
            <div className='statsContent-elem--stat'>{playerStatistics.bestScore}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-red'>
            <div className='statsContent-elem--header'>Worst Score</div>
            <div className='statsContent-elem--stat'>{playerStatistics.worstScore}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-green'>
            <div className='statsContent-elem--header'>Best Time</div>
            <div className='statsContent-elem--stat'>{playerStatistics.bestTime}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-red'>
            <div className='statsContent-elem--header'>Worst Time</div>
            <div className='statsContent-elem--stat'>{playerStatistics.worstTime}</div>
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
