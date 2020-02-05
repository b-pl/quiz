import React from 'react'
import Homepage from '../components/Homepage/Homepage'
import Highscores from '../components/Highscores/Highscores'
import Statistics from '../components/Statistics/Statistics'
import Categories from '../components/Categories/Categories'
import Question from '../components/Question/Question'
import Answer from '../components/Answer/Answer'
import Endgame from '../components/Endgame/Endgame'

const routes = {
  '/': () => <Homepage />,
  '/highscores': () => <Highscores />,
  '/statistics': () => <Statistics />,
  '/categories': () => <Categories />,
  '/question': () => <Question />,
  '/answer': () => <Answer />,
  '/endgame': () => <Endgame />
}

export default routes