import styles from './PerfectCuboid.scss'

function createMap (map) {
  map._map = {}
  map.forEach(pair => { map._map[pair.name] = pair.label })
  map.get = name => map._map[name]
  return map
}

export const TRIPLES = createMap([
  { name: 'abd', label: '(a, b, d)' },
  { name: 'ace', label: '(a, c, e)' },
  { name: 'bcf', label: '(b, c, f)' },
  { name: 'afg', label: '(a, f, g)' },
  { name: 'beg', label: '(b, e, g)' },
  { name: 'cdg', label: '(c, d, g)' }
])

export const TYPES = createMap([
  { name: 'xN', label: '\\times N' },
  { name: 'x2', label: '\\times 2' },
  { name: 'x3', label: '\\times 3' },
  { name: 'x4', label: '\\times 4' },
  { name: 'x5', label: '\\times 5' },
  { name: 'x2 x3', label: '\\times 2, 3' },
  { name: 'x2 x5', label: '\\times 2, 5' },
  { name: 'x3 x4', label: '\\times 3, 4' },
  { name: 'x3 x5', label: '\\times 3, 5' },
  { name: 'x4 x5', label: '\\times 4, 5' },
  { name: 'x2 x3 x5', label: '\\times 2, 3, 5' },
  { name: 'x3 x4 x5', label: '\\times 3, 4, 5' }
])

export const SIDES = createMap([
  { name: 'a', label: 'a' },
  { name: 'b', label: 'b' },
  { name: 'c', label: 'c' },
  { name: 'd', label: 'd' },
  { name: 'e', label: 'e' },
  { name: 'f', label: 'f' },
  { name: 'g', label: 'g' }
])

export const DIVISIBILITY = createMap([
  { name: 'd2', label: '2 \\mid n' },
  { name: 'd3', label: '3 \\mid n' },
  { name: 'd4', label: '4 \\mid n' },
  { name: 'd5', label: '5 \\mid n' }
])

export const TRUTH_STATES = createMap([
  { name: -1, label: styles.false },
  { name: 0, label: styles.unknown },
  { name: 1, label: styles.true }
])
