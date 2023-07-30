import { cards } from './constants/cards'

import type { Player } from './@types/Player'
import type { RuneClient } from 'rune-games-sdk/multiplayer'

export interface GameState {
  turn: number
  state: 'start' | 'end'
  phase: 'build_word' | 'show_score' | 'planning' | 'activation'
  phaseEndAt: number
  cardPool: {
    id: string
    from: string
    to: string
  }[]
  players: {
    [key: string]: Player
  }
}

type GameActions = {
  setCharacter(targetId: number): void
  setReady(ready: boolean): void
  startGame: (time: number) => void
  submitWord: (word: string) => void
  applyCard: (params: { id: string; from: string; to: string }) => void
  activate: () => void
  nextPhase: (params: {
    targetPhase: GameState['phase']
    endAt: number
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
      cardPool: [],
      phaseEndAt: Rune.gameTimeInSeconds(),
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
    applyCard: (card, { game, playerId }) => {
      // remove 1 card from player inventory
      game.players[playerId].stat.cardInventory.splice(
        game.players[playerId].stat.cardInventory.findIndex(c => c === card.id),
        1
      )

      // add card into a pool
      game.cardPool.push({
        id: card.id,
        from: playerId,
        to: card.to,
      })
    },
    activate: (_, { game, playerId }) => {
      // reset player stat to default before apply new cards
      game.players[playerId].stat = {
        ...game.players[playerId].stat,
        alphabetInventorySize: 16,
        cardPlayableSize: 4,
        luck: 1.0,
      }

      let affedtedCards = game.cardPool
        .filter(o => o.to === playerId)
        .map(card => cards.find(c => c.id === card.id)!)

      for (const card of affedtedCards) {
        let affectedFields = Object.keys(
          card.effect
        ) as (keyof Player['stat'])[]
        for (const feild of affectedFields) {
          // @ts-ignore
          game.players[playerId].stat[feild] = card.effect[feild](
            // @ts-ignore
            game.players[playerId].stat[feild]
          )
        }
      }
    },
    startGame: (time, { game }) => {
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
        game.cardPool = []
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
