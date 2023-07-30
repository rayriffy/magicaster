import { Card } from '../@types/Card'

export const cards: Card[] = [
  {
    id: 'reduce-alphabet-effect',
    name: 'Letter Slots Burner',
    description:
      "Destroy 2 - 4 alphabetical slots on the other player's side in the upcoming round",
    effect: {
      alphabetInventorySize: size => {
        const adjustSize = Math.floor(Math.random() * 3) + 2
        return size - adjustSize < 8 ? 8 : size - adjustSize
      }
    },
  },
  {
    id: 'buff-alphabet-effect',
    name: 'Letter Slots Expansion',
    description:
      'Increase 2 - 4 alphabetical slots on the your side in the upcoming round',
    effect: {
      alphabetInventorySize: size => {
        const adjustSize = Math.floor(Math.random() * 3) + 2
        return size + adjustSize > 24 ? 24 : size + adjustSize
      },
    },
  },
  {
    id: 'reduce-card-effect',
    name: 'Card Slots Burner',
    description:
      "Destroy 1 - 2 card slots on other player's side after the end of the upcoming round",
    effect: {
      cardPlayableSize: size =>
        size >= 2 ? size : size - (Math.floor(Math.random() * 2) + 1),
    },
  },
  {
    id: 'buff-card-effect',
    name: 'Card Slots Expansion',
    description:
      'Increase 1 - 2 card slots on your side after the end of the upcoming round',
    effect: {
      cardPlayableSize: size =>
        size >= 6 ? size : size + (Math.floor(Math.random() * 2) + 1),
    },
  },
  {
    id: 'reduce-score-effect',
    name: 'Chaos Charm',
    description:
      "Activate this card to randomly cut down other player's score by 5 - 20% in the upcoming round",
    effect: {
      score: score =>
        (score * (100 - (Math.floor(Math.random() * 2) + 1))) / 100,
    },
  },
  {
    id: 'buff-score-effect',
    name: "Fortune's Favor",
    description:
      'Activate this card to randomly boost your score by 5 - 20% in the upcoming round',
    effect: {
      score: score =>
        (score * (100 + (Math.floor(Math.random() * 16) + 5))) / 100,
    },
  },
]
