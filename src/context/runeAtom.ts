import { atom, onMount } from 'nanostores'
import { GameState } from '../logic'

export const runeAtom = atom<GameState | undefined>(undefined)
export const playerIdAtom = atom<string | undefined>(undefined)

onMount(runeAtom, () => {
  if (typeof window === 'undefined') return

  let unmounted = false

  Rune.initClient({
    onChange: ({ newGame, yourPlayerId }) => {
      if (unmounted) return
      runeAtom.set(newGame)
      playerIdAtom.set(yourPlayerId)
    },
  })

  return () => {
    unmounted = true
  }
})
