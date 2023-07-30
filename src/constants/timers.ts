import { GameState } from '../logic'

export const getPhaseEndTime = (phase: GameState['phase']) => {
  if (phase === 'build_word') return Rune.gameTimeInSeconds() + 15
  // else if (phase === 'show_score') return dayjs().add(5, 'seconds')
  if (phase === 'planning') return Rune.gameTimeInSeconds() + 10 * 60 * 60
  // else if (phase === 'activation') return dayjs().add(30, 'seconds')
  return Rune.gameTimeInSeconds() + 3
}
