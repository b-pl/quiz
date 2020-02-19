import React, { useState } from 'react'
import { navigate } from 'hookrouter'
import Button from '../Button/Button'
import './Question.css'

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
    }
  ])
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    if (counter >= 3) return navigate('/', true)
    else return setCounter(prev => prev+1)
    
  }

  const displayAnswers = () => {
    // Push answers for current question to an array
    let arr = []
    for (let i = 0; i < 4; i++) {
      arr.push(qArray[counter].answers[i][0])
    }
    
    // Map arr to put answers into buttons labels
    return arr && arr.map(x => (
      <Button key={arr.indexOf(x)} label={x} styling='menuButton' onClick={handleClick} />
    ))
  }

  return(
    <div>
      <div className='question_wrapper'>
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
