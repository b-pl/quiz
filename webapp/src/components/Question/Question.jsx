// CORE IMPORTS
import React, { useState, useEffect } from 'react'
import host from '../../core/config'
import { navigate } from 'hookrouter'
// CSS IMPORTS
import './Question.css'
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
  // * VARIABLES

  // Fetch questions from database
  useEffect(() => {
    fetch(`${host}/question/${props.category}`, {
      accept: 'application/json',
    })
      .then(res => res.json())
      .then(res => setFetchedQuestions(res))
  }, [])

  // Convert to desired structure
  const mapFetchedQuestions = () => {
    fetchedQuestions && fetchedQuestions.map((q) => {
      questions.push({
        question: q.question,
        answers: [[q.answer_1, 1], [q.answer_2], [q.answer_3], [q.answer_4]]
      })
    })
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
    
    if (questions[counter].answers[target][1] != null) updateScore(target, true)
    else updateScore(target, false)

    // Clear interval
    clearInterval(stopwatch)

    // Update counter
    setCounter(prevCounter => prevCounter + 1)
  }

  const displayQuestion = () => {
    if (questions.length === 0 || counter > 9) return null
    else return questions[counter].question
  }

  const countdown = () => {
    timeBonus = 10000

    // timeBonus -= 1 every 1ms
    stopwatch = setInterval(() => { timeBonus -= 1 }, 1)
  }

  const displayAnswers = () => {
    // * The fuck was this doing?
    // if (counter > 3) return true

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
        styling='menuButton'
        onClick={handleClick}
        icon='none' />
    ))
  }

  const updateLocalStorage = () => {
    // Get totalScore and add current score
    let totalScore = localStorage.getItem('totalScore')
    let newScoreTotal = Number(totalScore) + score

    // Get bestScore & worstScore
    let bestScore = localStorage.getItem('bestScore')
    let worstScore = localStorage.getItem('worstScore')

    // Get total of correct answers
    let correctTotal = localStorage.getItem('correctTotal')
    let newCorrectTotal = Number(correctTotal) + correctAnswers

    // Get total of wrong answers
    let wrongTotal = localStorage.getItem('wrongTotal')
    let newWrongTotal = Number(wrongTotal) + (10 - correctAnswers)

    // Get bestTime & worstTime
    let bestTime = localStorage.getItem('bestTime')
    let worstTime = localStorage.getItem('worstTime')

    // Actually update stats
    localStorage.setItem('correctAnswers', correctAnswers)
    localStorage.setItem('wrongAnswers', 10 - correctAnswers)
    localStorage.setItem('totalScore', newScoreTotal)
    localStorage.setItem('correctTotal', newCorrectTotal)
    localStorage.setItem('wrongTotal', newWrongTotal)
    let totalPlayed = localStorage.getItem('totalPlayed')
    localStorage.setItem('totalPlayed', ++totalPlayed)

    // Check for bestScore      
    if (score > bestScore) localStorage.setItem('bestScore', score)
    
    // Check for worstScore
    if (worstScore == 0) localStorage.setItem('worstScore', score)
    else if (score < worstScore) localStorage.setItem('worstScore', score)

    // Get time from localStorage
    let time = localStorage.getItem('time')

    // Check for bestTime
    if (bestTime == 0) localStorage.setItem('bestTime', time)
    else if (time < bestTime) localStorage.setItem('bestTime', time)

    // Check for worstTime
    if(time > worstTime) localStorage.setItem('worstTime', time)
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
      <Clock />
      <div className='question_wrapper'>
        <Topbar score={score} question={counter + 1} />
        
        {/* If there's no questions left navigate to endGame
        Otherwise increment counter to display next question */}
        {updateAndRedirect()}

        <div className='header'>
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
