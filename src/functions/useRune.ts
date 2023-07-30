import { useEffect, useMemo } from 'react'

import { useStore } from '@nanostores/react'

import { runeAtom, playerIdAtom } from '../context/runeAtom'
import { getPhaseEndTime } from '../constants/timers'

export const useRune = () => {
  const game = useStore(runeAtom)
  const playerId = useStore(playerIdAtom)

  const player = useMemo(
    () => (playerId ? game?.players[playerId] ?? null : null),
    [playerId, game?.players]
  )

  useEffect(() => {
    if (!game || !playerId) return

    let playablePlayers = Object.keys(game?.players)
      .filter(p => game.players[p].ready)
      .sort()

    // check if he is head of players
    if (playablePlayers[0] === playerId) {
      if (
        game &&
        Object.keys(game.players).length > 1 &&
        game.state === 'end' &&
        Object.keys(game.players).every(player => game.players[player].ready)
      ) {
        Rune.actions.startGame(getPhaseEndTime('build_word'))
      }
    }
  }, [game?.players, playerId])

  return {
    playerId,
    player,
    game,
  }
}
