import React, { useEffect, useRef } from 'react'

import ChooseCharacterGUI, {
  MODE as ChooseCharacterGUIMode,
  Options as ChooseCharacterGUIOptions,
} from './ChooseCharacterGUI'

import LobbyGUI, {
  MODE as LobbyGUIMode,
  Options as LobbyGUIOptions,
} from './LobbyGUI'

import WordOrderingGUI, {
  MODE as WordOrderingGUIMode,
  Options as WordOrderingGUIOptions,
} from './WordOrderingGUI'

import RankDisplayGUI, {
  MODE as RankDisplayGUIMode,
  Options as RankDisplayGUIOptions,
} from './RankDisplayGUI'

import PlanningGUI, {
  MODE as PlanningGUIMode,
  Options as PlanningGUIOptions,
} from './PlanningGUI'

import ActivationGUI, {
  MODE as ActivationGUIMode,
  Options as ActivationGUIOptions,
} from './ActivationGUI'

import { Options as GameHeaderDisplayerOptions } from './GameHeaderDisplayer'

import { GameDisplayRenderer, RenderManager } from '../../graphic/renderer'
import { CHARACTER_COLOR_LIST } from './const'
import GameHeaderDisplayer from './GameHeaderDisplayer'
import GameGraphicDisplayer from './GameGraphicDisplayer'
import BurnSlotEffect from '../../graphic/renderer/effects/burnSlotEffect'
import ReduceManaSlotEffect from '../../graphic/renderer/effects/reduceManaEffect'
import ScoreBuffEffect from '../../graphic/renderer/effects/scoreBuffEffect'
import ShieldEffect from '../../graphic/renderer/effects/shieldEffect'
import ReduceScoreEffect from '../../graphic/renderer/effects/reduceScoreEffect'
import { ActivatedCard } from '../../logic'
import { cards } from '../../constants/cards'

type OverAllInfo = {
  characterIndex: { [playerID: string]: number }
  currentPlayerID: string
  playerScore: { [playerID: string]: number }
  cardPool: ActivatedCard[]
}

type GameGUIProps =
  | {
      mode: ChooseCharacterGUIMode
      options: ChooseCharacterGUIOptions
    }
  | {
      mode: LobbyGUIMode
      options: LobbyGUIOptions & OverAllInfo
    }
  | {
      mode: WordOrderingGUIMode
      options: WordOrderingGUIOptions & GameHeaderDisplayerOptions & OverAllInfo
    }
  | {
      mode: RankDisplayGUIMode
      options: RankDisplayGUIOptions & GameHeaderDisplayerOptions & OverAllInfo
    }
  | {
      mode: PlanningGUIMode
      options: PlanningGUIOptions & GameHeaderDisplayerOptions & OverAllInfo
    }
  | {
      mode: ActivationGUIMode
      options: ActivationGUIOptions & GameHeaderDisplayerOptions & OverAllInfo
    }

const GameGUI: React.FC<GameGUIProps> = ({ mode, options }) => {
  const renderManagerRef = useRef<RenderManager>(new RenderManager())
  const gameDisplayRendererRef = useRef<GameDisplayRenderer | null>(null)

  useEffect(() => {
    if (
      (mode === 'LOBBY_GUI' ||
        mode === 'WORD_ORDERING' ||
        mode === 'RANK_DISPLAY' ||
        mode === 'PLANNING_GUI' ||
        mode === 'ACTIVATION_GUI') &&
      gameDisplayRendererRef.current !== null
    ) {
      gameDisplayRendererRef.current
        .getCharacterGroupRenderer()
        .allAnimateToWithXPortions(
          options.playerScore,
          options.currentPlayerID,
          window.innerWidth / 2
        )
    }
  })

  useEffect(() => {
    if (mode === 'ACTIVATION_GUI' && gameDisplayRendererRef.current !== null) {
      const enemyCardPool = options.cardPool.filter(
        ({ to }) => to === options.currentPlayerID
      )

      for (let index = 0; index < enemyCardPool.length; index++) {
        const { id } = enemyCardPool[index]
        const pr = gameDisplayRendererRef.current
          .getCharacterGroupRenderer()
          .getCharacterRendererMap()[options.currentPlayerID]

        if (id === 'reduce-alphabet-effect' || id === 'buff-alphabet-effect') {
          gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
            renderer: new BurnSlotEffect(pr, 3000),
            onStart: () => console.log('start'),
            onSuccess: () => console.log('success'),
          })
        }

        if (id === 'reduce-card-effect' || id === 'buff-card-effect') {
          gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
            renderer: new ReduceManaSlotEffect(pr, 3000),
            onStart: () => console.log('start1'),
            onSuccess: () => console.log('success1'),
          })
        }

        if (id === 'reduce-score-effect') {
          gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
            renderer: new ReduceScoreEffect(pr, 3000),
            onStart: () => console.log('start4'),
            onSuccess: () => console.log('success4'),
          })
        }

        if (id === 'buff-score-effect') {
          gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
            renderer: new ScoreBuffEffect(pr, 3000),
            onStart: () => console.log('start2'),
            onSuccess: () => console.log('success2'),
          })
        }
      }
    }
  }, [mode])

  useEffect(() => {
    if (
      (mode === 'LOBBY_GUI' ||
        mode === 'WORD_ORDERING' ||
        mode === 'RANK_DISPLAY' ||
        mode === 'PLANNING_GUI' ||
        mode === 'ACTIVATION_GUI') &&
      gameDisplayRendererRef.current === null
    ) {
      gameDisplayRendererRef.current = new GameDisplayRenderer({
        width: window.innerWidth,
        characterColor: Object.fromEntries(
          Object.entries(options.characterIndex).map(([id, index]) => [
            id,
            CHARACTER_COLOR_LIST[index],
          ])
        ),
        forcusedCharacterID: options.currentPlayerID,
      })
      renderManagerRef.current.addRenderer(gameDisplayRendererRef.current)
    }
  }, [mode])

  useEffect(() => {
    renderManagerRef.current.start()

    return () => {
      renderManagerRef.current.stop()
      if (gameDisplayRendererRef.current)
        gameDisplayRendererRef.current.destroy()
    }
  }, [])

  if (mode === 'CHOOSE_CHARACTER_GUI') {
    return (
      <ChooseCharacterGUI
        renderManager={renderManagerRef.current}
        options={options}
      />
    )
  }

  if (mode === 'LOBBY_GUI') {
    return <LobbyGUI options={options} />
  }
  console.log('DEBUG: REACH2')
  if (gameDisplayRendererRef.current === null) return null
  console.log('DEBUG: REACH')

  return (
    <>
      <GameHeaderDisplayer
        renderManager={renderManagerRef.current}
        options={{
          score: options.score,
          deadline: options.deadline,
        }}
      />
      <GameGraphicDisplayer
        gameDisplayRenderer={gameDisplayRendererRef.current}
      />
      {mode === 'WORD_ORDERING' && <WordOrderingGUI options={options} />}
      {mode === 'RANK_DISPLAY' && <RankDisplayGUI options={options} />}
      {mode === 'PLANNING_GUI' && (
        <PlanningGUI
          renderManager={renderManagerRef.current}
          options={options}
        />
      )}
      {mode === 'ACTIVATION_GUI' && <ActivationGUI options={options} />}
    </>
  )

  return null
}

export default GameGUI
