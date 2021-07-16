function gcd (a, b) {
  a = Math.abs(a)
  while (b) {
    [a, b] = [b, a % b]
  }
  return a
}

class Fraction {
  constructor (p, q = 1) {
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

  subtract (frac) {
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

  lessThan (frac) {
    return this.p * frac.q < this.q * frac.p
  }

  toString () {
    return this.p + '/' + this.q
  }
}

module.exports = { Fraction }
