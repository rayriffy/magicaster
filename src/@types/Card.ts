import type { Player } from './Player'

export interface Card {
  id: string
  name: string
  description: string
  effect: Partial<{
    [key in keyof Player['stat']]: (
      state: Player['stat'][key]
    ) => Player['stat'][key]
  }>
}
