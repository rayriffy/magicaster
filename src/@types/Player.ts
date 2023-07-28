export interface Player {
  id: string
  score: number
  phaseCompleted: boolean
  stat: {
    alphabetInventorySize: number
    cardInventorySize: number
    luck: number
  }
}
