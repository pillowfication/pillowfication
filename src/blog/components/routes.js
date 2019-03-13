import kebabCase from 'lodash/kebabCase'

import GodelsIncompletenessTheorems from './godels-incompleteness-theorems/GodelsIncompletenessTheorems.jsx'
import NewtonsMethod from './newtons-method/NewtonsMethod.jsx'
import SolidAngles from './solid-angles/SolidAngles.jsx'

const routes = [
  GodelsIncompletenessTheorems,
  NewtonsMethod,
  SolidAngles
].map(blog => ({
  date: blog.date,
  path: kebabCase(blog.title),
  title: blog.title,
  component: blog.component
}))

export default routes
