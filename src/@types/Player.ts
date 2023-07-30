export interface Player {
  avatar: number | null
  phaseCompleted: boolean
  ready: boolean
  stat: {
    score: number
    alphabetInventorySize: number
    cardInventorySize: number
    luck: number
  }
}
