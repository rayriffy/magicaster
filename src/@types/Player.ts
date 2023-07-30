export interface Player {
  avatar: number | null
  phaseCompleted: boolean
  ready: boolean
  stat: {
    score: number
    alphabetInventorySize: number
    cardPlayableSize: number
    luck: number
    cardInventory: string[]
  }
}
