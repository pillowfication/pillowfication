function gcd (a, b) {
  a = Math.abs(a)
  while (b) {
    [a, b] = [b, a % b]
  }
  return a
}

class Fraction {
  constructor (p, q) {
    this.p = p
    this.q = q

    if (this.p === 0) {
      this.q = 1
      return
    }
    if (this.q < 0) {
      this.p = -this.p
      this.q = -this.q
    }
    const factor = gcd(this.p, this.q)
    this.p /= factor
    this.q /= factor
  }

  add (frac) {
    return new Fraction(this.p * frac.q + this.q * frac.p, this.q * frac.q)
  }

  multiply (frac) {
    return new Fraction(this.p * frac.p, this.q * frac.q)
  }

  equals (frac) {
    return this.p === frac.p && this.q === frac.q
  }

  greaterThan (frac) {
    return this.p * frac.q > this.q * frac.p
  }
}

function invertMatrix (m) {
  const dimension = m.length

  for (let i = 0; i < dimension; ++i) {
    for (let j = 0; j < dimension; ++j) {
      m[i][j] = new Fraction(m[i][j], 1)
    }
  }

  const inverse = []
  for (let i = 0; i < dimension; ++i) {
    inverse.push(Array(dimension).fill(0).map((_, j) => new Fraction(j === i ? 1 : 0, 1)))
  }

  for (let i = 0; i < dimension; ++i) {
    // Swap
    if (m[i][i].p === 0) {
      let nonzero = i
      while (++nonzero < dimension && m[i][nonzero].p === 0);
      if (nonzero === dimension) return null

      ;[m[i], m[nonzero]] = [m[nonzero], m[i]]
      ;[inverse[i], inverse[nonzero]] = [inverse[nonzero], inverse[i]]
    }

    // Scale
    const scale = new Fraction(m[i][i].q, m[i][i].p)
    for (let j = i; j < dimension; ++j) {
      m[i][j] = m[i][j].multiply(scale)
    }
    for (let j = 0; j < dimension; ++j) {
      inverse[i][j] = inverse[i][j].multiply(scale)
    }

    // Eliminate
    for (let j = 0; j < dimension; ++j) {
      if (j === i) continue
      if (m[j][i].p !== 0) {
        const multiple = new Fraction(-m[j][i].p, m[j][i].q)
        for (let k = i; k < dimension; ++k) {
          m[j][k] = m[j][k].add(m[i][k].multiply(multiple))
        }
        for (let k = 0; k < dimension; ++k) {
          inverse[j][k] = inverse[j][k].add(inverse[i][k].multiply(multiple))
        }
      }
    }
  }

  return inverse
}

module.exports = { Fraction, invertMatrix }
