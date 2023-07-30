import type { Player } from './@types/Player'
import type { RuneClient } from 'rune-games-sdk/multiplayer'
import { cards } from './constants/cards'
import dayjs, { Dayjs } from 'dayjs'

export interface GameState {
  turn: number
  state: 'start' | 'end'
  phase: 'build_word' | 'show_score' | 'planning' | 'activation'
  phaseEndAt: string
  players: {
    [key: string]: Player
  }
}

type GameActions = {
  setCharacter(targetId: number): void
  setReady(ready: boolean): void
  startGame: (time: string) => void
  submitWord: (word: string) => void
  nextPhase: (params: {
    targetPhase: GameState['phase']
    endAt: string
  }) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (playerIds): GameState => {
    return {
      turn: 0,
      state: 'end',
      phase: 'activation',
      phaseEndAt: new Date().toISOString(),
      players: Object.fromEntries(
        playerIds.map(id => [
          id,
          {
            avatar: null,
            phaseCompleted: false,
            ready: false,
            stat: {
              score: 0,
              alphabetInventorySize: 16,
              cardPlayableSize: 4,
              luck: 1.0,
              cardInventory: [],
            },
          },
        ])
      ),
    }
  },
  actions: {
    startGame: (time, { game, playerId }) => {
      game.state = 'start'
      game.turn = 1
      game.phase = 'build_word'
      game.phaseEndAt = time
    },
    setCharacter: (targetId, { game, playerId }) => {
      game.players[playerId].avatar = targetId
    },
    setReady: (ready, { game, playerId }) => {
      game.players[playerId].ready = ready
      game.players[playerId].phaseCompleted = false
      game.players[playerId].stat = {
        score: 0,
        alphabetInventorySize: 16,
        cardPlayableSize: 4,
        luck: 1.0,
        cardInventory: [],
      }
    },
    submitWord: (word, { game, playerId }) => {
      // determine score player will get
      let score =
        word.length <= 4
          ? word.length
          : word.length <= 7
          ? word.length * 1.25
          : word.length * 2

      // apply score to player
      game.players[playerId].stat.score += score

      if (word.length >= 4) {
        // add a random card to player's inventory
        const targetCardId = cards[Math.floor(Math.random() * cards.length)]
        game.players[playerId].stat.cardInventory.push(targetCardId.id)
      }
    },
    nextPhase: ({ targetPhase, endAt }, { game }) => {
      game.phase = targetPhase
      game.phaseEndAt = endAt

      if (targetPhase === 'build_word') {
        if (game.turn < 5) game.turn += 1
        else Rune.gameOver()
      }
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      // Handle player joined
      game.players[playerId] = {
        avatar: null,
        phaseCompleted: false,
        ready: false,
        stat: {
          score: 0,
          alphabetInventorySize: 16,
          cardPlayableSize: 4,
          luck: 1.0,
          cardInventory: [],
        },
      }
    },
    playerLeft(playerId, { game }) {
      // Handle player left
      delete game.players[playerId]
    },
  },
})
