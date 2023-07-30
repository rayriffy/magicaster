import dayjs from 'dayjs'
import { GameState } from '../logic'

export const getPhaseEndTime = (phase: GameState['phase']) => {
  if (phase === 'build_word') return dayjs().add(2, 'minutes')
  return dayjs()
}
