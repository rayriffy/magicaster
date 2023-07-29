import { useEffect, useState } from 'react'
import GameGUI from './components/GameGUI'
import './App.css'
import { GameState } from './logic.ts'
import * as graphicAssets from './graphic/assets/index.ts'
import * as PIXI from 'pixi.js'

function App() {
  const [game, setGame] = useState<GameState>()
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true)

  const [characterSelections, setCharacterSelections] = useState<{
    [playerID: string]: number
  }>({ test: 0, test2: 1 })

  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame }) => {
        setGame(newGame)
      },
    })

    graphicAssets.load().then(() => {
      setLoadingAssets(false)
    })
  }, [])

  if (!game || loadingAssets) {
    return <div>Loading...</div>
  }

  return (
    <GameGUI
      mode="CHOOSE_CHARACTER_GUI"
      options={{
        playerID: 'test',
        characterSelections: characterSelections,
        onSelect: index => {
          setCharacterSelections({ ...characterSelections, test: index })
        },
        onSubmit: () => {
          console.log(characterSelections)
        },
      }}
    />
  )
}

export default App
