const chanceMap: [string, number][] = [
  ['a', 7.9036],
  ['b', 2.3123],
  ['i', 7.3352],
  ['l', 5.4347],
  ['t', 5.9624],
  ['y', 1.947],
  ['s', 9.4419],
  ['e', 11.5146],
  ['o', 5.9268],
  ['u', 3.6506],
  ['v', 0.9685],
  ['n', 5.8782],
  ['c', 3.7354],
  ['d', 4.155],
  ['m', 2.8104],
  ['p', 2.9774],
  ['r', 7.2089],
  ['h', 2.4562],
  ['q', 0.1863],
  ['g', 3.0879],
  ['j', 0.2547],
  ['f', 1.6029],
  ['w', 1.2238],
  ['k', 1.3291],
  ['z', 0.3457],
  ['x', 0.3506],
]

const randomFromWeight = (weights: number[]) => {
  const sumWeight = weights.reduce((sum, w) => sum + w, 0)
  const randomPoint = Math.random() * sumWeight
  let accWeight = 0
  for (let index = 0; index < weights.length; index++) {
    accWeight += weights[index]
    if (accWeight > randomPoint) return index
  }

  return 0
}

export const randomCharacter = () => {
  const weights = chanceMap.map(([_, w]) => w)
  const randomIndex = randomFromWeight(weights)
  const randChar = chanceMap[randomIndex][0].toUpperCase()

  return randChar
}
