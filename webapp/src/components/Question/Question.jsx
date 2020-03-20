import React, { useState } from 'react'
import { navigate } from 'hookrouter'
import Button from '../Button/Button'
import './Question.css'
import Topbar from '../Topbar/Topbar'

function Question() {
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
    stopwatch = setInterval(() => {timeBonus -= 1; }, 1)
  }

  const updateAndRedirect = () => {
    // Update localStorage w/ new score
    localStorage.setItem('score', score)
    // Update localStorage w/ number of correct answers
    localStorage.setItem('correctAnswers', correctAnswers)
    // Redirect
    if (counter > 3) return navigate('/endgame', true)
  }

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
