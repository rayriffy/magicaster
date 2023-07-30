import { Card } from '../@types/Card'

export const cards: Card[] = [
  {
    id: 'burn-slot-effect',
    name: 'Burn Slot',
    description: 'Reduce target player alphabet slot by 2-4',
    effect: {
      alphabetInventorySize: size =>
        size <= 8
          ? size
          : size - Math.floor((Math.random() * 1000000000) % 3) - 2,
    },
  },
  {
    id: 'reduce-card-slot-effect',
    name: 'Reduce Card',
    description: 'Reduce target player card slot by 1',
    effect: {
      cardPlayableSize: size => (size <= 2 ? size : size - 1),
    },
  },
  {
    id: 'reduce-score-effect',
    name: 'Reduce Score',
    description: 'Reduce target player score by 5-10%',
    effect: {
      score: score =>
        (score * (100 - (Math.floor((Math.random() * 1000000000) % 6) + 5))) /
        100,
    },
  },
  {
    id: 'score-buff-effect',
    name: 'Score buff',
    description: 'Score +20%',
    effect: {
      score: score => score * 1.2,
    },
  },
]
