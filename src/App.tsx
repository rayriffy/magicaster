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
      ) : game.state === 'end' && !player?.avatar ? (
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
      ) : game.state === 'end' && player?.avatar ? (
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
      ) : game.state === 'end' && player?.avatar ? (
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
      ) : game.state === 'start' && game.phase === 'build_word' ? (
        <GameGUI
          mode="WORD_ORDERING"
          options={{
            deadline: new Date(game.phaseEndAt).getTime(),
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
            onSpell: Rune.actions.submitWord,
          }}
        />
      ) : (
        <p className="text-white text-center pt-12 text-2xl font-bold">
          Missing phase {game.phase}
        </p>
      )}
    </Fragment>
  )

  // BEBUG: WORD ORDERING
  // return (
  //   <GameGUI
  //     mode="WORD_ORDERING"
  //     options={{
  //       deadline: Date.now() + 1000 * 120,
  //       score: 100,
  //       cardNumber: 10,
  //       slotInfos: Array(4 * 4)
  //         .fill(1)
  //         .map<SlotInfo>((_, index) => ({
  //           id: `slot-${index}`,
  //           character: String.fromCharCode(
  //             65 + Math.floor((90 - 65) * Math.random())
  //           ),
  //           isDisable: false,
  //         })),
  //       onSpell: console.log,
  //     }}
  //   />

  // return (
  //   <GameGUI
  //     mode="RANK_DISPLAY"
  //     options={{
  //       deadline: 0,
  //       score: 100,
  //       playerRankInfos: Object.entries(game.players)
  //         .filter(([_, player]) => player.avatar)
  //         .map(([id, player]) => ({
  //           playerID: id,
  //           name: id,
  //           avatarURL:
  //             'https://fastly.picsum.photos/id/791/100/100.jpg?hmac=WEb2YRQzOxdTKepKuaQlWqG1RNRKSAytYrC6dB3kMAY',

  //           score: Math.floor(Math.random() * 100),
  //           cardNumber: Math.floor(Math.random() * 10),
  //         })),
  //       round: 2,
  //       totalRound: 5,
  //     }}
  //   />
  // )
}

export default App
