function p (mx, my) {
  return new Path(mx, my)
}

class Path {
  constructor (mx, my) {
    this.str = `M${mx} ${my}`
  }

  h (dx) {
    this.str += ` h${dx}`
    return this
  }

  v (dy) {
    this.str += ` v${dy}`
    return this
  }

  l (dx, dy) {
    this.str += ` l${dx} ${dy}`
    return this
  }

  a (dx, dy, sweepFlag) {
    const r = Math.abs(dx)
    this.str += ` a${r} ${r} 0 0 ${sweepFlag} ${dx} ${dy}`
    return this
  }

  toString () {
    return this.str + ' Z'
  }

  end () {
    return this.str
  }
}

export default p
