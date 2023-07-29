import { useEffect, useState } from 'react'
import GameGUI from './components/GameGUI'
import './App.css'
import { GameState } from './logic.ts'
import * as graphicAssets from './graphic/assets/index.ts'

function App() {
  const [game, setGame] = useState<GameState>()
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true)

  // DEBUG: CHOOSE_CHARACTER_GUI
  // const [characterSelections, setCharacterSelections] = useState<{
  //   [playerID: string]: number
  // }>({ test: 0, test2: 1 })

  // DEBUG: CHOOSE_CHARACTER_GUI
  // const [lobbyInfo, setLobbyInfo] = useState<PlayerLobbyInfo[]>([
  //   {
  //     playerID: 'test',
  //     isReady: false,
  //     name: 'test',
  //     avatarUrl:
  //       'https://fastly.picsum.photos/id/791/100/100.jpg?hmac=WEb2YRQzOxdTKepKuaQlWqG1RNRKSAytYrC6dB3kMAY',
  //   },
  //   {
  //     playerID: 'test1',
  //     isReady: false,
  //     name: 'test1',
  //     avatarUrl:
  //       'https://fastly.picsum.photos/id/352/100/100.jpg?hmac=XJ8GDmWcHATjfDldUJ04CNjvKlK99iJpnv6f9BCFvXg',
  //   },
  //   {
  //     playerID: 'test2',
  //     isReady: true,
  //     name: 'test2',
  //     avatarUrl:
  //       'https://fastly.picsum.photos/id/451/100/100.jpg?hmac=UB5lEhpd8e4mPIfWVYHSIDhF0Zuw9XpeyhdnVfXli7E',
  //   },
  //   {
  //     playerID: 'test3',
  //     isReady: true,
  //     name: 'test3',
  //     avatarUrl:
  //       'https://fastly.picsum.photos/id/585/100/100.jpg?hmac=aT28j06l-pFS46D95AKOAzzQYhk2lrnAWZ28cQzydn8',
  //   },
  // ])

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
