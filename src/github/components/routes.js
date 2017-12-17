import AwesomeDings from './awesome-dings/AwesomeDings.jsx'
import CIS89C from './cis89c/CIS89C.jsx'
import Moofuck from './moofuck/Moofuck.jsx'
import PerfectCuboid from './perfect-cuboid/PerfectCuboid.jsx'
import PFKonami from './pf-konami/PFKonami.jsx'

const routes = [{
  header: 'pillowfication',
  children: [
    { path: 'awesome-dings', component: AwesomeDings },
    { path: 'cis89c', component: CIS89C },
    { path: 'moofuck', component: Moofuck },
    { path: 'perfect-cuboid', component: PerfectCuboid },
    { path: 'pf-konami', component: PFKonami }
  ]
}]

for (const routeGroup of routes) {
  const pathPrefix = routeGroup.header === 'pillowfication' ? '/' : '/' + routeGroup.header
  for (const route of routeGroup.children) {
    route.fullPath = pathPrefix + route.path
  }
}

export default routes
