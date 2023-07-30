import { Fragment, useEffect, useState } from 'react'
import GameGUI from './components/GameGUI'
import './App.css'
import * as graphicAssets from './graphic/assets/index.ts'
import { useRune } from './functions/useRune.ts'
import { SlotInfo } from './components/GameGUI/WordOrderingGUI.tsx'
import { useTimer } from './functions/useTimer.ts'

function App() {
  const { game, player, playerId } = useRune()
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true)

  useTimer()

  useEffect(() => {
    graphicAssets.load().then(() => {
      setLoadingAssets(false)
    })
  }, [])

  return (
    <Fragment>
      {!game || loadingAssets ? (
        <div>Loading...</div>
      ) : game.state === 'end' && player?.avatar === null ? (
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
      ) : game.state === 'end' && player?.avatar !== null ? (
        <GameGUI
          mode="LOBBY_GUI"
          options={{
            playerID: playerId,
            playerLobbyInfos: Object.entries(game.players)
              .filter(([_, player]) => player.avatar !== null)
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
      ) : game.state === 'end' && player?.avatar !== null ? (
        <GameGUI
          mode="LOBBY_GUI"
          options={{
            playerID: playerId,
            playerLobbyInfos: Object.entries(game.players)
              .filter(([_, player]) => player.avatar !== null)
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
      ) : game.state === 'start' && game.phase === 'build_word' ? (
        <GameGUI
          mode="WORD_ORDERING"
          options={{
            deadline: game.phaseEndAt,
            score: player!.stat.score,
            cardNumber: player!.stat.cardInventory.length,
            slotInfos: Array(4 * 4)
              .fill(1)
              .map<SlotInfo>((_, index) => ({
                id: `slot-${index}`,
                character: String.fromCharCode(
                  65 + Math.floor((90 - 65) * Math.random())
                ),
                isDisable: false,
              })),
            onSpell: word => {
              Rune.actions.submitWord(word)
            },
          }}
        />
      ) : game.state === 'start' && game.phase === 'show_score' ? (
        <GameGUI
          mode="RANK_DISPLAY"
          options={{
            deadline: game.phaseEndAt,
            score: player!.stat.score,
            playerRankInfos: Object.entries(game.players)
              .filter(([_, player]) => player.ready)
              .map(([id, player]) => ({
                playerID: id,
                name: id,
                avatarURL:
                  'https://fastly.picsum.photos/id/791/100/100.jpg?hmac=WEb2YRQzOxdTKepKuaQlWqG1RNRKSAytYrC6dB3kMAY',

                score: player.stat.score,
                cardNumber: player.stat.cardInventory.length,
              })),
            round: game.turn,
            totalRound: 5,
          }}
        />
      ) : game.state === 'start' && game.phase === 'planning' ? (
        <GameGUI
          mode="PLANNING_GUI"
          options={{
            deadline: game.phaseEndAt,
            score: player!.stat.score,
            playerInfos: Object.entries(game.players)
              .filter(([_, player]) => player.ready)
              .map(([id, player]) => ({
                playerID: id,
                name: id,
                characterIndex: player.avatar!,
              })),
            cardIds: player!.stat.cardInventory,
          }}
        />
      ) : game.state === 'start' && game.phase === 'activation' ? (
        <GameGUI
          mode="ACTIVATION_GUI"
          options={{
            deadline: game.phaseEndAt,
            score: player!.stat.score,
            cardPool: game.cardPool,
          }}
        />
      ) : (
        <p className="text-white text-center pt-12 text-2xl font-bold">
          Missing phase {game.phase}
        </p>
      )}
    </Fragment>
  )
}

export default App
