import { useEffect, useMemo } from 'react'

import { useStore } from '@nanostores/react'

import { runeAtom, playerIdAtom } from '../context/runeAtom'

export const useRune = () => {
  const game = useStore(runeAtom)
  const playerId = useStore(playerIdAtom)

  const player = useMemo(
    () => (playerId ? game?.players[playerId] ?? null : null),
    [playerId, game?.players]
  )

  useEffect(() => {
    if (
      game &&
      Object.keys(game.players).length > 1 &&
      game.state === 'end' &&
      Object.keys(game.players).every(player => game.players[player].ready)
    ) {
      Rune.actions.startGame()
    }
  }, [game?.players])

  return {
    playerId,
    player,
    game,
  }
}
