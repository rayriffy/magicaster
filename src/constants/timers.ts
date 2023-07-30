import dayjs from 'dayjs'
import { GameState } from '../logic'

export const getPhaseEndTime = (phase: GameState['phase']) => {
  // if (phase === 'build_word') return dayjs().add(2, 'minutes')
  // else if (phase === 'show_score') return dayjs().add(5, 'seconds')
  if (phase === 'planning') return dayjs().add(10, 'hours')
  // else if (phase === 'activation') return dayjs().add(30, 'seconds')
  return dayjs().add(3, 'seconds')
}
