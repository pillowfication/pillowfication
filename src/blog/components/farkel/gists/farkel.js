const PAYOUTS = {
  1: 100,
  5: 50,
  11: 200,
  15: 150,
  55: 100,
  111: 300,
  115: 250,
  155: 200,
  222: 200,
  333: 300,
  444: 400,
  555: 500,
  666: 600,
  1111: 1000,
  1115: 350,
  1155: 300,
  1222: 300,
  1333: 400,
  1444: 500,
  1555: 600,
  1666: 700,
  2222: 1000,
  2225: 250,
  3333: 1000,
  3335: 350,
  4444: 1000,
  4445: 450,
  5555: 1000,
  5666: 650,
  6666: 1000,
  11111: 2000,
  11115: 1050,
  11155: 400,
  11222: 400,
  11333: 500,
  11444: 600,
  11555: 700,
  11666: 800,
  12222: 1100,
  12225: 350,
  13333: 1100,
  13335: 450,
  14444: 1100,
  14445: 550,
  15555: 1100,
  15666: 750,
  16666: 1100,
  22222: 2000,
  22225: 1050,
  22255: 300,
  33333: 2000,
  33335: 1050,
  33355: 400,
  44444: 2000,
  44445: 1050,
  44455: 500,
  55555: 2000,
  55666: 700,
  56666: 1050,
  66666: 2000,
  111111: 3000,
  111115: 2050,
  111122: 1500,
  111133: 1500,
  111144: 1500,
  111155: 1500,
  111166: 1500,
  111222: 2500,
  111333: 2500,
  111444: 2500,
  111555: 2500,
  111666: 2500,
  112222: 1500,
  112225: 450,
  112233: 1500,
  112244: 1500,
  112255: 1500,
  112266: 1500,
  113333: 1500,
  113335: 550,
  113344: 1500,
  113355: 1500,
  113366: 1500,
  114444: 1500,
  114445: 650,
  114455: 1500,
  114466: 1500,
  115555: 1500,
  115566: 1500,
  115666: 850,
  116666: 1500,
  122222: 2100,
  122225: 1150,
  122255: 400,
  123456: 1500,
  133333: 2100,
  133335: 1150,
  133355: 500,
  144444: 2100,
  144445: 1150,
  144455: 600,
  155555: 2100,
  155666: 800,
  156666: 1150,
  166666: 2100,
  222222: 3000,
  222225: 2050,
  222233: 1500,
  222244: 1500,
  222255: 1500,
  222266: 1500,
  222333: 2500,
  222444: 2500,
  222555: 2500,
  222666: 2500,
  223333: 1500,
  223344: 1500,
  223355: 1500,
  223366: 1500,
  224444: 1500,
  224455: 1500,
  224466: 1500,
  225555: 1500,
  225566: 1500,
  226666: 1500,
  333333: 3000,
  333335: 2050,
  333344: 1500,
  333355: 1500,
  333366: 1500,
  333444: 2500,
  333555: 2500,
  333666: 2500,
  334444: 1500,
  334455: 1500,
  334466: 1500,
  335555: 1500,
  335566: 1500,
  336666: 1500,
  444444: 3000,
  444445: 2050,
  444455: 1500,
  444466: 1500,
  444555: 2500,
  444666: 2500,
  445555: 1500,
  445566: 1500,
  446666: 1500,
  555555: 3000,
  555566: 1500,
  555666: 2500,
  556666: 1500,
  566666: 2050,
  666666: 3000
}

function getDecisions (roll) {
  const decisions = [0, 0, 0, 0, 0, 0]
  const rollLength = roll.length
  for (let indicator = 1; indicator < (1 << rollLength); ++indicator) {
    let subset = ''
    for (let i = 0; i < rollLength; ++i) {
      if (indicator & (1 << i)) {
        subset += roll[i]
      }
    }
    const index = rollLength - subset.length
    decisions[index] = Math.max(decisions[index], PAYOUTS[subset] || 0)
  }
  return decisions
}

function incrementDice (dice) {
  for (let index = 5; index >= 0; --index) {
    if (++dice[index] !== 7) {
      const rollover = dice[index]
      for (++index; index < 6; ++index) {
        dice[index] = rollover
      }
      return dice
    }
  }
  return null
}

function getAllDecisions () {
  const results = {}
  for (let dice = [0, 0, 0, 0, 0, 1]; dice; dice = incrementDice(dice)) {
    const key = dice.filter(x => x).join('')
    results[key] = getDecisions(key)
  }
  return results
}

module.exports = getAllDecisions