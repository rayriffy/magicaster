import { useEffect, useState } from 'react'
import GameGUI from './components/GameGUI'
import './App.css'
import { GameState } from './logic.ts'
import * as graphicAssets from './graphic/assets/index.ts'

function App() {
  const [game, setGame] = useState<GameState>()
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true)

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

  // DEBUG: CHOOSE_CHARACTER_GUI
  // return (
  //   <GameGUI
  //     mode="CHOOSE_CHARACTER_GUI"
  //     options={{
  //       playerID: 'test',
  //       characterSelections: characterSelections,
  //       onSelect: index => {
  //         setCharacterSelections({ ...characterSelections, test: index })
  //       },
  //       onSubmit: () => {
  //         console.log(characterSelections)
  //       },
  //     }}
  //   />
  // )

  // DEBUG: LOBBY_GUI
  // return (
  //   <GameGUI
  //     mode="LOBBY_GUI"
  //     options={{
  //       playerID: 'test',
  //       playerLobbyInfos: lobbyInfo,
  //       onCancel: () => {
  //         setLobbyInfo(
  //           lobbyInfo.map(value =>
  //             value.playerID === 'test' ? { ...value, isReady: false } : value
  //           )
  //         )
  //       },
  //       onReady: () => {
  //         setLobbyInfo(
  //           lobbyInfo.map(value =>
  //             value.playerID === 'test' ? { ...value, isReady: true } : value
  //           )
  //         )
  //       },
  //     }}
  //   />
  // )

  // BEBUG: WOR
  return <GameGUI mode="WORD_ORDERING" options={{}} />
}

export default App
