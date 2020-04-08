// CORE IMPORTS
import React from 'react'
import { A } from 'hookrouter'
import { useState, useEffect } from 'react'
// CSS IMPORTS
import '../../css/RootStylesheet.css'
import './Statistics.css'
import '../Button/Button.css'
// COMPONENTS IMPORTS
import Button from '../Button/Button'
// TRANSLATION
const translations = {
  pl: {
    statistics: 'Statystyki',
    clearStatistics: 'Wyczyść statystyki',
    totalPlayed: 'Rozegranych gier',
    correctTotal: 'Dobrych odpowiedzi',
    wrongTotal: 'Złych odpowiedzi',
    totalScore: 'Całkowity wynik',
    bestScore: 'Najlepszy wynik',
    worstScore: 'Najgorszy wynik',
    bestTime: 'Najlepszy czas',
    worstTime: 'Najgorszy czas',
  },
  en: {
    statistics: 'Statistics',
    clearStatistics: 'Clear statistics',
    totalPlayed: 'Games Playes',
    correctTotal: 'Corrent Answers',
    wrongTotal: 'Wrong Answers',
    totalScore: 'Total Score',
    bestScore: 'Best Score',
    worstScore: 'Worst Score',
    bestTime: 'Best Time',
    worstTime: 'Worst Time',
  }
}

function Statistics() {
  const [player] = useState(localStorage.getItem('playerName') + 'stats')
  const [playerStatistics, setPlayerStatistics] = useState(JSON.parse(localStorage.getItem(player)))
  const [translation, setTranslation] = useState({ ...translations.en })

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

  // Set set language
  useEffect(() => {
    if (localStorage.getItem('lang') === 'en') return setTranslation({ ...translations.en })
    else return setTranslation({ ...translations.pl })
  }, [])


  const addS = () => {
    if (localStorage.getItem('lang') === 'pl') return localStorage.getItem('playerName')
    else return localStorage.getItem('playerName') + '\'s'
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='header'>
          <p className='heading'>{addS()}</p>
          <p className='heading'>{translation.statistics}</p>

          <hr className='separator-stats' />
        </div>
        <div className='statsContent'>
          <div className='statsContent-elem statsContent-elem--noheight'>
            <button className='clearButton' onClick={clearStatistics}>{translation.clearStatistics}</button>
          </div>
          <div className='statsContent-elem'>
            <div className='statsContent-elem--header'>{translation.totalPlayed}</div>
            <div className='statsContent-elem--stat'>{playerStatistics.totalPlayed}</div>
          </div>
          <div className='statsContent-elem'>
            <div className='statsContent-elem--header'>{translation.totalScore}</div>
            <div className='statsContent-elem--stat'>{playerStatistics.totalScore}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-green'>
            <div className='statsContent-elem--header'>{translation.correctTotal}</div>
            <div className='statsContent-elem--stat'>{playerStatistics.correctTotal}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-red'>
            <div className='statsContent-elem--header'>{translation.wrongTotal}</div>
            <div className='statsContent-elem--stat'>{playerStatistics.wrongTotal}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-green'>
            <div className='statsContent-elem--header'>{translation.bestScore}</div>
            <div className='statsContent-elem--stat'>{playerStatistics.bestScore}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-red'>
            <div className='statsContent-elem--header'>{translation.worstScore}</div>
            <div className='statsContent-elem--stat'>{playerStatistics.worstScore}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-green'>
            <div className='statsContent-elem--header'>{translation.bestTime}</div>
            <div className='statsContent-elem--stat'>{playerStatistics.bestTime}</div>
          </div>
          <div className='statsContent-elem--small statsContent-elem-red'>
            <div className='statsContent-elem--header'>{translation.worstTime}</div>
            <div className='statsContent-elem--stat'>{playerStatistics.worstTime}</div>
          </div>
        </div>
        <div className='button'>
          <A href='/home'>
            <Button label='Menu' styling='redButton smaller' icon='none' /></A>
        </div>
      </div>
    </div>
  )
}

export default Statistics
