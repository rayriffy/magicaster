import { useMemo } from 'react'

import { useStore } from '@nanostores/react'

import { runeAtom, playerIdAtom } from '../context/runeAtom'

export const useRune = () => {
  const game = useStore(runeAtom)
  const playerId = useStore(playerIdAtom)

  const player = useMemo(
    () => game?.players.find(p => p.id === playerId) ?? null,
    [playerId, game?.players]
  )

  return {
    playerId,
    player,
    game,
  }
}
