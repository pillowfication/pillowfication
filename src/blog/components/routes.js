import kebabCase from 'lodash/kebabCase'

import Caffeine from './caffeine/Caffeine.jsx'
import FactorioFractions from './factorio-fractions/FactorioFractions.jsx'
import FactorioFractions2 from './factorio-fractions/FactorioFractions2.jsx'
// import GeneralizedSimplexNoise from './generalized-simplex-noise/GeneralizedSimplexNoise.jsx'
import GodelsIncompletenessTheorems from './godels-incompleteness-theorems/GodelsIncompletenessTheorems.jsx'
import Hangman from './hangman/Hangman.jsx'
import NewtonsMethod from './newtons-method/NewtonsMethod.jsx'
import SolidAngles from './solid-angles/SolidAngles.jsx'
import SwapSorting from './swap-sorting/SwapSorting.jsx'

const routes = [
  Caffeine,
  FactorioFractions,
  FactorioFractions2,
  // GeneralizedSimplexNoise,
  GodelsIncompletenessTheorems,
  Hangman,
  NewtonsMethod,
  SolidAngles,
  SwapSorting
].map(blog => ({
  date: blog.date,
  path: kebabCase(blog.title),
  title: blog.title,
  component: blog.component
}))

export default routes
