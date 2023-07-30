import { useEffect, useState } from 'react'
import GameGUI from './components/GameGUI'
import './App.css'
import * as graphicAssets from './graphic/assets/index.ts'
import { useRune } from './functions/useRune.ts'

function App() {
  const { game, player, playerId } = useRune()
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true)

  useEffect(() => {
    graphicAssets.load().then(() => {
      setLoadingAssets(false)
    })
  }, [])

  if (!game || loadingAssets) {
    return <div>Loading...</div>
  }

  if (game.state === 'end' && !player?.avatar) {
    return (
      <GameGUI
        mode="CHOOSE_CHARACTER_GUI"
        options={{
          playerID: playerId,
          characterSelections: Object.fromEntries(
            Object.keys(game.players)
              .map(playerId => [playerId, game.players[playerId].avatar])
              .filter(([_, val]) => val)
          ),
          onSubmit: index => {
            Rune.actions.setCharacter(index)
          },
        }}
      />
    )
  } else if (game.state === 'end' && player?.avatar) {
    return (
      <GameGUI
        mode="LOBBY_GUI"
        options={{
          playerID: playerId,
          playerLobbyInfos: Object.entries(game.players)
            .filter(([_, player]) => player.avatar)
            .map(([id, player]) => ({
              name: id,
              playerID: id,
              isReady: player.ready,
              avatarUrl:
                'https://fastly.picsum.photos/id/791/100/100.jpg?hmac=WEb2YRQzOxdTKepKuaQlWqG1RNRKSAytYrC6dB3kMAY',
            })),
          onCancel: () => Rune.actions.setReady(false),
          onReady: () => Rune.actions.setReady(true),
        }}
      />
    )
  }

  // BEBUG: WOR
  return (
    <GameGUI
      mode="WORD_ORDERING"
      options={{ deadline: Date.now() + 1000 * 120, score: 100 }}
    />
  )
}

export default App
