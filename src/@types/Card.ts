import type { Player } from './Player'

export interface Card {
  name: string
  description: string
  effect: {
    [key in keyof Player['stat']]: (
      state: Player['stat'][key]
    ) => Player['stat'][key]
  }[]
}
