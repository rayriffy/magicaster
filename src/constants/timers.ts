import { GameState } from '../logic'

export const getPhaseEndTime = (phase: GameState['phase']) => {
  if (phase === 'build_word') return Rune.gameTimeInSeconds() + 2 * 60
  else if (phase === 'planning') return Rune.gameTimeInSeconds() + 40
  else if (phase === 'activation') return Rune.gameTimeInSeconds() + 20
  return Rune.gameTimeInSeconds() + 5
}
