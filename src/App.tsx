import { useEffect, useState } from 'react'
import GameGUI from './components/GameGUI'
import './App.css'
import { GameState } from './logic.ts'

function App() {
  const [game, setGame] = useState<GameState>()
  const [characterSelections, setCharacterSelections] = useState<{
    [playerID: string]: number
  }>({ test: 0 })
  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame }) => {
        setGame(newGame)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <GameGUI
      mode="CHOOSE_CHARACTER_GUI"
      props={{
        playerID: 'test',
        characterSelections: characterSelections,
        onSubmit: characterSelections => {
          setCharacterSelections(characterSelections)
        },
      }}
    />
  )
}

export default App
