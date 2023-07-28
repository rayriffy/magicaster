import { PlayerAlphabetGrid } from './components/PlayerAlphabetGrid.tsx'
import { SelectedAlpabets } from './components/SelectedAlpabets.tsx'

import { useRune } from './functions/useRune.ts'

import './App.css'
import { useTimer } from './functions/useTimer.ts'

function App() {
  const {
    player,
    game,
  } = useRune()
  const { remaining } = useTimer()

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex h-full flex-col justify-between">
      <div className="flex justify-between">
        <p>
          Score: <b>{player?.score}</b>
        </p>
        <p>
          Timer:{' '}
          <b>
            {String(remaining.minutes).padStart(2, '0')}:
            {String(remaining.seconds).padStart(2, '0')}
          </b>
        </p>
      </div>
      <SelectedAlpabets />
      <div className="shrink-0 space-y-6">
        <PlayerAlphabetGrid />
        <button className="rounded-lg bg-pink-500 px-4 py-2 font-medium text-white">
          Locked in!
        </button>
      </div>
    </main>
  )
}

export default App
