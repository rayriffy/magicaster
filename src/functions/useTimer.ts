import { useEffect } from 'react'
import { useRune } from './useRune'
import { GameState } from '../logic'
import { getPhaseEndTime } from '../constants/timers'

export const useTimer = () => {
  const { game } = useRune()

  useEffect(() => {
    if (!game || game.state === 'end') return

    let endedAt = game.phaseEndAt
    const interval = setInterval(() => {
      if (endedAt > Rune.gameTimeInSeconds()) {
        let targetNextPhase: GameState['phase'] =
          game.phase === 'build_word'
            ? 'show_score'
            : game.phase === 'show_score'
            ? 'planning'
            : game.phase === 'planning'
            ? 'activation'
            : 'build_word'

        Rune.actions.nextPhase({
          targetPhase: targetNextPhase,
          endAt: getPhaseEndTime(targetNextPhase),
        })
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [game?.phaseEndAt, game?.phase])
}
