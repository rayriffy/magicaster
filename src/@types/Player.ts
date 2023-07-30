export interface Player {
  score: number
  avatar: number | null
  phaseCompleted: boolean
  ready: boolean
  stat: {
    alphabetInventorySize: number
    cardInventorySize: number
    luck: number
  }
}
