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

type GameGUIProps =
  | {
      mode: ChooseCharacterGUIMode
      options: ChooseCharacterGUIOptions
    }
  | {
      mode: LobbyGUIMode
      options: LobbyGUIOptions
    }
  | {
      mode: WordOrderingGUIMode
      options: WordOrderingGUIOptions & GameHeaderDisplayerOptions
    }
  | {
      mode: RankDisplayGUIMode
      options: RankDisplayGUIOptions & GameHeaderDisplayerOptions
    }
  | {
      mode: PlanningGUIMode
      options: PlanningGUIOptions & GameHeaderDisplayerOptions
    }
  | {
      mode: ActivationGUIMode
      options: ActivationGUIOptions & GameHeaderDisplayerOptions
    }

const GameGUI: React.FC<GameGUIProps> = ({ mode, options }) => {
  const renderManagerRef = useRef<RenderManager>(new RenderManager())
  const gameDisplayRendererRef = useRef<GameDisplayRenderer | null>(null)

  useEffect(() => {
    if (mode === 'LOBBY_GUI') {
      gameDisplayRendererRef.current = new GameDisplayRenderer({
        width: window.innerWidth,
        characterColor: CHARACTER_COLOR_LIST.slice(0, 4),
        forcusedCharacterIndex: 1,
      })
      renderManagerRef.current.addRenderer(gameDisplayRendererRef.current)
    }
  }, [mode])

  useEffect(() => {
    renderManagerRef.current.start()

    // setTimeout(() => {
    //   const pr = gameDisplayRendererRef.current
    //     .getCharacterGroupRenderer()
    //     .getCharacterRendererList()[0]

    //   gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
    //     renderer: new BurnSlotEffect(pr, 3000),
    //     onStart: () => console.log('start'),
    //     onSuccess: () => console.log('success'),
    //   })

    //   gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
    //     renderer: new ReduceManaSlotEffect(pr, 3000),
    //     onStart: () => console.log('start1'),
    //     onSuccess: () => console.log('success1'),
    //   })

    //   gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
    //     renderer: new ReduceScoreEffect(pr, 3000),
    //     onStart: () => console.log('start4'),
    //     onSuccess: () => console.log('success4'),
    //   })

    //   gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
    //     renderer: new ScoreBuffEffect(pr, 3000),
    //     onStart: () => console.log('start2'),
    //     onSuccess: () => console.log('success2'),
    //   })

    //   gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
    //     renderer: new ShieldEffect(pr, 3000),
    //     onStart: () => console.log('start3'),
    //     onSuccess: () => console.log('success3'),
    //   })
    // }, 8000)
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

  if (gameDisplayRendererRef.current === null) return null

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
