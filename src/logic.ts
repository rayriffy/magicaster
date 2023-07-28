import type { Player } from './@types/Player'
import type { RuneClient } from 'rune-games-sdk/multiplayer'

export interface GameState {
  turn: number
  state: 'start' | 'end'
  phase: 'build_word' | 'show_score' | 'planning' | 'activation' | 'review'
  players: Player[]
}

type GameActions = {
  // nextPhase: () => void
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
      players: playerIds.map(id => ({
        id: id,
        score: 0,
        phaseCompleted: false,
        stat: {
          alphabetInventorySize: 16,
          cardInventorySize: 4,
          luck: 1.0,
        },
      })),
    }
  },
  actions: {},
  events: {
    playerJoined: (playerId, ctx) => {
      // Handle player joined
      ctx.game.players.push({
        id: playerId,
        score: 0,
        phaseCompleted: false,
        stat: {
          alphabetInventorySize: 16,
          cardInventorySize: 4,
          luck: 1.0,
        },
      })
    },
    playerLeft(playerId, ctx) {
      // Handle player left
      ctx.game.players = ctx.game.players.filter(p => p.id !== playerId)
    },
  },
})
