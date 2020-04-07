// CORE IMPORTS
import React, { useState, useEffect } from 'react'
import host from '../../core/config'
import { navigate } from 'hookrouter'
// CSS IMPORTS
import '../../css/RootStylesheet.css'
// COMPONENTS IMPORTS
import Button from '../Button/Button'
import Topbar from '../Topbar/Topbar'
import Clock from '../Clock/Clock'

function Question(props) {
  // * VARIABLES
  // Array for fetched questions
  const [fetchedQuestions, setFetchedQuestions] = useState()
  // Array to map fetchedQuesetions
  let questions = []
  // Helping counter; Iterates through arrays
  const [counter, setCounter] = useState(0)
  // Present user score
  const [score, setScore] = useState(0)
  // Score multiplier
  const [multiplier, setMultiplier] = useState(1)
  // Number of correct answers in present game
  const [correctAnswers, setCorrectAnswers] = useState(0)
  // Points for correct answer
  const CORRECT_ANSWER_POINTS = 5000
  // Bonus points for quick answer
  let timeBonus
  // Stopwatch for calculating timeBonus
  let stopwatch
  // Array for shuffling questions
  const [range, setRange] = useState()
  // * VARIABLES

  // Fetch questions from database
  // ComponentDidMount
  useEffect(() => {
    fetch(`${host}/question/${props.category}/${props.lang}`, {
      accept: 'application/json',
    })
      .then(res => res.json())
      .then(res => setFetchedQuestions(res))

    generateNumbers()
    // Set range[] to undefined on unmount
    return (() => { setRange(undefined) })
  }, [])

  const generateNumbers = () => {
    let helperArray = []
    // Save numbers in range into array
    for (let i = 0; i < 49; i++) {
      helperArray.push(i)
    }

    // Shuffle them
    helperArray.sort(() => Math.random() - 0.5)

    // Get 10 of them
    helperArray.splice(10, helperArray.length - 10)

    setRange(helperArray)
  }

  // Convert to desired structure
  const mapFetchedQuestions = () => {
    if (fetchedQuestions === undefined) {
      return null
    } else {
      for (let i = 0; i < 10 ; i++) {
        questions.push({
          question: fetchedQuestions[range[i]].question,
          answers: [[fetchedQuestions[range[i]].answer_1, 1], [fetchedQuestions[range[i]].answer_2], [fetchedQuestions[range[i]].answer_3], [fetchedQuestions[range[i]].answer_4]]
        })
        // Sort answers alphabetically so correct answer won't be always 1st
        questions[i].answers.sort()
      }
    }
  }

  const updateScore = (target, correctAnswer) => {
    // If player gave wrong answer set multiplier to 1 
    if (correctAnswer === false) return setMultiplier(1)

    // Else update score
    // Increase multiplier after correct answer (up to 3)
    if (multiplier < 3) setMultiplier(prevMultiplier => prevMultiplier + 1)

    // Prevent negative timeBonus
    if (timeBonus < 0) timeBonus = 0

    // Calculate total score
    let totalScore = (CORRECT_ANSWER_POINTS + timeBonus) * multiplier

    // Update score
    setScore(prevScore => prevScore + totalScore)

    // Increment correctAnswers counter
    setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1)
  }

  const handleClick = (e) => {
    const target = e.currentTarget.id
    
    // Update state
    if (questions[counter].answers[target][1] != null) updateScore(target, true)
    else updateScore(target, false)

    // Clear interval
    clearInterval(stopwatch)

    // Update counter
    setCounter(prevCounter => prevCounter + 1)
  }

  const displayQuestion = () => {
    if (questions.length === 0 || counter > 9) return null
    else return questions[counter].question + '?'
  }

  const countdown = () => {
    timeBonus = 10000

    // timeBonus -= 1 every 1ms
    stopwatch = setInterval(() => { timeBonus -= 1 }, 1)
  }

  const displayAnswers = () => {
    // Start countdown to compute timeBonus
    countdown()

    // Push answers for current question to an array
    let arr = []
    if (questions.length === 0 || counter > 9) {
      return null
    } else {
      for (let i = 0; i < 4; i++) {
        arr.push(questions[counter].answers[i][0])
      }
    }

    // Map arr to put answers into buttons labels
    return arr && arr.map(x => (
      <Button key={arr.indexOf(x)}
        id={arr.indexOf(x)}
        label={x}
        styling='menuButton menuButton-text--small'
        onClick={handleClick}
        icon='none' />
    ))
  }

  const updateLocalStorage = () => {
    // Get statistics
    let player = localStorage.getItem('playerName') + 'stats'
    let playerStatistics = JSON.parse(localStorage.getItem(player))
    let time = localStorage.getItem('time')

    // Update Statistics
    playerStatistics.correctAnswers = correctAnswers
    playerStatistics.wrongAnswers = 10 - correctAnswers
    playerStatistics.totalScore += score
    playerStatistics.correctTotal += correctAnswers
    playerStatistics.wrongTotal += (10 - correctAnswers)
    playerStatistics.totalPlayed++

    // Check for bestScore
    if (score > playerStatistics.bestScore) playerStatistics.bestScore = score

    // Check for worstScore
    if (playerStatistics.worstScore === 0) playerStatistics.worstScore = score
    else if (score < playerStatistics.worstScore) playerStatistics.worstScore = score

    // Check for bestTime
    if (playerStatistics.bestTime === 0) playerStatistics.bestTime = time
    else if (time < playerStatistics.bestTime) playerStatistics.bestTime = time

    // Check for worstTime
    if(time > playerStatistics.worstTime) playerStatistics.worstTime = time

    // Send statistics to localStorage
    localStorage.setItem(player, JSON.stringify(playerStatistics))
  }

  const sendScoreToDatabase = () => {
    const data = {
      playerName: localStorage.getItem('playerName'),
      score: localStorage.getItem('score'),
      time: localStorage.getItem('time')
    }

    fetch(`${host}/sendScore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  const updateAndRedirect = () => {
    // Update localStorage w/ new score
    localStorage.setItem('score', score)
    // Update localStorage w/ number of correct answers
    localStorage.setItem('correctAnswers', correctAnswers)
    // Redirect
    if (counter > 9){ 
      updateLocalStorage()
      sendScoreToDatabase()

      // Navigate to endGame component
      return navigate('/endgame', true)
    }
  }

  return (
    <div>
      {/* Start clock */}
      <Clock />
      <div className='wrapper space-between'>
        <Topbar score={score} question={counter + 1} />
        
        {/* If there's no questions left navigate to endGame
        Otherwise increment counter to display next question */}
        {updateAndRedirect()}

        <div className='header header-text--small'>
          {/* Display question */}
          {mapFetchedQuestions()}
          {displayQuestion()}

          <hr className='separator' />
        </div>

        {/* Display possible answers */}
        {displayAnswers()}
      </div>
    </div>
  )
}

export default Question
