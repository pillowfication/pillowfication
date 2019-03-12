import AwesomeDings from './awesome-dings/AwesomeDings.jsx'
import CIS89C from './cis89c/CIS89C.jsx'
import Moofuck from './moofuck/Moofuck.jsx'
import PerfectCuboid from './perfect-cuboid/PerfectCuboid.jsx'
import PFBoggle from './pf-boggle/PFBoggle.jsx'
import PFKonami from './pf-konami/PFKonami.jsx'
import PFPerlin from './pf-perlin/PFPerlin.jsx'
import PFSowpods from './pf-sowpods/PFSowpods.jsx'
import PFValueNoise from './pf-value-noise/PFValueNoise.jsx'
import Pillowfication from './pillowfication/Pillowfication.jsx'
import PillowficationOld from './pillowfication-old/PillowficationOld.jsx'

const routes = [{
  header: '/pillowfication',
  children: [
    { path: 'awesome-dings', component: AwesomeDings },
    { path: 'cis89c', component: CIS89C },
    { path: 'moofuck', component: Moofuck },
    { path: 'perfect-cuboid', component: PerfectCuboid },
    { path: 'pf-boggle', component: PFBoggle },
    { path: 'pf-konami', component: PFKonami },
    { path: 'pf-perlin', component: PFPerlin },
    { path: 'pf-sowpods', component: PFSowpods },
    { path: 'pf-value-noise', component: PFValueNoise },
    { path: 'pillowfication', component: Pillowfication },
    { path: 'pillowfication-old', component: PillowficationOld }
  ]
}]

for (const routeGroup of routes) {
  const pathPrefix = routeGroup.header === '/pillowfication' ? '/' : routeGroup.header + '/'
  for (const route of routeGroup.children) {
    route.fullPath = pathPrefix + route.path
  }
}

export default routes
