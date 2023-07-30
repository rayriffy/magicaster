const chanceMap: [string, number][] = [
  ['E', 11.1607],
  ['A', 8.4966],
  ['R', 7.5809],
  ['I', 7.5448],
  ['O', 7.1635],
  ['T', 6.9509],
  ['N', 6.6544],
  ['S', 5.7351],
  ['L', 5.4893],
  ['C', 4.5388],
  ['U', 3.6308],
  ['D', 3.3844],
  ['P', 3.1671],
  ['M', 3.0129],
  ['H', 3.0034],
  ['G', 2.4705],
  ['B', 2.072],
  ['F', 1.8121],
  ['Y', 1.7779],
  ['W', 1.2899],
  ['K', 1.1016],
  ['V', 1.0074],
  ['X', 0.2902],
  ['Z', 0.2722],
  ['J', 0.1965],
  ['Q', 0.1962],
]

// const chanceMap: [string, number][] = [
//   ['a', 7.9036],
//   ['b', 2.3123],
//   ['i', 7.3352],
//   ['l', 5.4347],
//   ['t', 5.9624],
//   ['y', 1.947],
//   ['s', 9.4419],
//   ['e', 11.5146],
//   ['o', 5.9268],
//   ['u', 3.6506],
//   ['v', 0.9685],
//   ['n', 5.8782],
//   ['c', 3.7354],
//   ['d', 4.155],
//   ['m', 2.8104],
//   ['p', 2.9774],
//   ['r', 7.2089],
//   ['h', 2.4562],
//   ['q', 0.1863],
//   ['g', 3.0879],
//   ['j', 0.2547],
//   ['f', 1.6029],
//   ['w', 1.2238],
//   ['k', 1.3291],
//   ['z', 0.3457],
//   ['x', 0.3506],
// ]

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

const buildCounMap = (arr: string[]) => {
  let result: Record<string, number> = {}
  for (let key of arr) {
    if (!result.hasOwnProperty(key)) result[key] = 0
    result[key] += 1
  }
  return result
}

export const randomCharArray = (
  initArray: string[],
  limit: number,
  amount: number
) => {
  const countMap = buildCounMap(initArray)
  let charProps = chanceMap.filter(
    ([char]) => (countMap[char] || 0) < limit
  )
  let result = []
  for (let index = 0; index < amount; index++) {
    const weights = charProps.map(([_, w]) => w)
    const randomIndex = randomFromWeight(weights)
    const randChar = charProps[randomIndex][0]
    result.push(randChar)
    countMap[randChar] = countMap.hasOwnProperty(randChar)
      ? countMap[randChar] + 1
      : 1
    charProps = chanceMap.filter(
      ([char]) => (countMap[char] || 0) < limit
    )
  }
  return result
}

export const randomCharacter = () => {
  const weights = chanceMap.map(([_, w]) => w)
  const randomIndex = randomFromWeight(weights)
  const randChar = chanceMap[randomIndex][0].toUpperCase()

  return randChar
}
