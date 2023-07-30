import type { Player } from './@types/Player'
import type { RuneClient } from 'rune-games-sdk/multiplayer'

export interface GameState {
  turn: number
  state: 'start' | 'end'
  phase: 'build_word' | 'show_score' | 'planning' | 'activation' | 'review'
  players: {
    [key: string]: Player
  }
}

type GameActions = {
  setCharacter(targetId: number): void
  setReady(ready: boolean): void
  startGame: () => void
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
      phase: 'review',
      players: Object.fromEntries(
        playerIds.map(id => [
          id,
          {
            score: 0,
            avatar: null,
            phaseCompleted: false,
            ready: false,
            stat: {
              alphabetInventorySize: 16,
              cardInventorySize: 4,
              luck: 1.0,
            },
          },
        ])
      ),
    }
  },
  actions: {
    startGame: (_, { game }) => {
      game.state = 'start'
      game.turn = 1
      game.phase = 'build_word'
    },
    setCharacter: (targetId, { game, playerId }) => {
      game.players[playerId].avatar = targetId
    },
    setReady: (ready, { game, playerId }) => {
      game.players[playerId].ready = ready
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      // Handle player joined
      game.players[playerId] = {
        score: 0,
        avatar: null,
        phaseCompleted: false,
        ready: false,
        stat: {
          alphabetInventorySize: 16,
          cardInventorySize: 4,
          luck: 1.0,
        },
      }
    },
    playerLeft(playerId, { game }) {
      // Handle player left
      delete game.players[playerId]
    },
  },
})
