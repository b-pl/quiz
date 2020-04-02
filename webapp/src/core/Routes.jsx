import React from 'react'
import Homepage from '../components/Homepage/Homepage'
import Highscores from '../components/Highscores/Highscores'
import Statistics from '../components/Statistics/Statistics'
import Categories from '../components/Categories/Categories'
import Question from '../components/Question/Question'
import Answer from '../components/Answer/Answer'
import Endgame from '../components/Endgame/Endgame'
import Topbar from '../components/Topbar/Topbar'
import AreYouReady from '../components/AreYouReady/AreYouReady'

const routes = {
  '/': () => <Homepage />,
  '/highscores': () => <Highscores />,
  '/statistics': () => <Statistics />,
  '/categories': () => <Categories />,
  '/question': () => <Question />,
  '/question/:category': ({ category }) => <Question category={ category } />,
  '/answer': () => <Answer />,
  '/endgame': () => <Endgame />,
  '/topbar': () => <Topbar />,
  '/areyouready': () => <AreYouReady />,
  '/areyouready/:category': ({ category }) => <AreYouReady category={ category } />
}

export default routes