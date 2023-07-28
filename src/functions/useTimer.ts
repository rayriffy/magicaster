import { useEffect, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { GameState } from '../logic'

dayjs.extend(duration)

export const useTimer = (game: GameState | undefined) => {
  const [end, setEnd] = useState<Dayjs>(dayjs().add(2, 'minutes'))
  const [now, setNow] = useState<Dayjs>(dayjs())

  // calculate difference between now and end, return as object of minute and seconds remaining
  const remaining = useMemo(() => {
    const diff = end.diff(now)
    let duration = dayjs.duration(diff)

    const roundNegative = (val: number) => (val < 0 ? 0 : val)

    return {
      minutes: roundNegative(duration.minutes()),
      seconds: roundNegative(duration.seconds()),
    }
  }, [end, now])

  const ended = useMemo(
    () => remaining.minutes === 0 && remaining.seconds === 0,
    [remaining.minutes, remaining.seconds]
  )

  useEffect(() => {
    setEnd(dayjs().add(2, 'minutes'))

    const interval = setInterval(() => {
      setNow(dayjs())
    }, 1000)

    return () => clearInterval(interval)
  }, [game?.phase])

  return {
    remaining,
    ended,
  }
}
