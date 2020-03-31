import React, { useState, useEffect } from 'react'
import { navigate } from 'hookrouter'
import Button from '../Button/Button'
import './Question.css'
import Topbar from '../Topbar/Topbar'
import host from '../../core/config'

function Question(props) {
  const [allQuestions, setAllQuestions] = useState()

  useEffect(() => {
    fetch(`${host}/question/${props.category}`, {
      accept: 'application/json',
    })
      .then(res => res.json())
      .then(res => setAllQuestions(res))
      .then(res => console.log(allQuestions))

    console.log('AllQuestions = ' + allQuestions)
    let totalPlayed = localStorage.getItem('totalPlayed')
    localStorage.setItem('totalPlayed', ++totalPlayed)

    const timerr = setInterval(() => { setTime(prevTime => prevTime + 1) }, 1000)
    return () => clearInterval(timerr)
  }, [])

  const [qArray] = useState([
    {
      question: 'Question 1',
      answers: [['Wrong1'], ['Wrong2'], ['Correct', 1], ['Wrong3']]
    },
    {
      question: 'Question 2',
      answers: [['Wrong1'], ['Wrong2'], ['Wrong3'], ['Correct', 1]]
    },
    {
      question: 'Question 3',
      answers: [['Correct', 1], ['Wrong2'], ['Wrong3'], ['Wrong1']]
    },
    {
      question: 'Question 4',
      answers: [['Wrong2'], ['Correct', 1], ['Wrong3'], ['Wrong1']]
    },
    '1'
  ])
  const [counter, setCounter] = useState(0)
  const [score, setScore] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [time, setTime] = useState(0)
  const CORRECT_ANSWER_POINTS = 5000
  let timeBonus
  let stopwatch

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
    
    if (qArray[counter].answers[target][1] != null) updateScore(target, true)
    else updateScore(target, false)

    // Clear interval
    clearInterval(stopwatch)

    // Update counter
    setCounter(prevCounter => prevCounter + 1)
  }

  const displayAnswers = () => {
    if (counter > 3) return true
    countdown()
    // Push answers for current question to an array
    let arr = []
    for (let i = 0; i < 4; i++) {
      arr.push(qArray[counter].answers[i][0])
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

  const countdown = () => {
    timeBonus = 10000

    // timeBonus -= 1 every 1ms
    stopwatch = setInterval(() => { timeBonus -= 1 }, 1)
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
    localStorage.setItem('time', time)

    // Check for bestScore      
    if (score > bestScore) localStorage.setItem('bestScore', score)
    
    // Check for worstScore
    if (worstScore == 0) localStorage.setItem('worstScore', score)
    else if (score < worstScore) localStorage.setItem('worstScore', score)

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
    if (counter > 3){ 
      updateLocalStorage()
      sendScoreToDatabase()

      // Navigate to endGame component
      return navigate('/endgame', true)
    }
  }

  // ComponentDidMount
  // useEffect(() => {
  //   console.log('category FRONT = ' + props.category)
  //   console.log('AllQuestions = ' + allQuestions)
  //   let totalPlayed = localStorage.getItem('totalPlayed')
  //   localStorage.setItem('totalPlayed', ++totalPlayed)

  //   const timerr = setInterval(() => { setTime(prevTime => prevTime + 1) }, 1000)
  //   return () => clearInterval(timerr)
  // }, [])

  return(
    <div>
      <div className='question_wrapper'>
        
        <Topbar score={score} question={counter + 1} />
        {/* If there's no questions left navigate to endGame
        Otherwise increment counter to display next question */}
        {updateAndRedirect()}

        <div className='header'>
          {/* Display question */}
          {qArray[counter].question}

          <hr className='separator' />
        </div>

        {/* Display possible answers */}
        {displayAnswers()}
      </div>
    </div>
  )
}

export default Question
