import React from 'react'
import Homepage from '../components/Homepage/Homepage'
import Highscores from '../components/Highscores/Highscores'
import Statistics from '../components/Statistics/Statistics'
import Categories from '../components/Categories/Categories'
import Question from '../components/Question/Question'
import Endgame from '../components/Endgame/Endgame'
import Topbar from '../components/Topbar/Topbar'
import Translation from '../components/Translation/Translation'

const routes = {
  '/': () => <Homepage />,
  '/highscores': () => <Highscores />,
  '/statistics': () => <Statistics />,
  '/categories': () => <Categories />,
  '/question': () => <Question />,
  '/question/:category': ({ category }) => <Question category={ category } />,
  '/question/:category/:lang': ({ category, lang }) => <Question category={ category } lang={ lang } />,
  '/endgame': () => <Endgame />,
  '/topbar': () => <Topbar />,
  '/translation': () => <Translation />
}

export default routes