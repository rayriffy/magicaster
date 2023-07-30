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

import { Options as GameHeaderDisplayerOptions } from './GameHeaderDisplayer'

import { GameDisplayRenderer, RenderManager } from '../../graphic/renderer'
import { CHARACTER_COLOR_LIST } from './const'
import GameHeaderDisplayer from './GameHeaderDisplayer'
import GameGraphicDisplayer from './GameGraphicDisplayer'
import EffectQueueRenderer from '../../graphic/renderer/effectQueueRenderer'
import BurnSlotEffect from '../../graphic/renderer/effects/burnSlotEffect'

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

const GameGUI: React.FC<GameGUIProps> = ({ mode, options }) => {
  const renderManagerRef = useRef<RenderManager>(new RenderManager())
  const gameDisplayRendererRef = useRef<GameDisplayRenderer>(
    new GameDisplayRenderer({
      width: window.innerWidth,
      characterColor: CHARACTER_COLOR_LIST.slice(0, 4),
      forcusedCharacterIndex: 1,
    })
  )

  useEffect(() => {
    renderManagerRef.current.start()
    renderManagerRef.current.addRenderer(gameDisplayRendererRef.current)

    setTimeout(() => {
      console.log('add effect')

      const pr = gameDisplayRendererRef.current
        .getCharacterGroupRenderer()
        .getCharacterRendererList()[0]
      gameDisplayRendererRef.current.getEffectQueueRenderer().addEffect({
        renderer: new BurnSlotEffect(pr, 5000),
        onStart: () => console.log('start'),
        onSuccess: () => console.log('success'),
      })
    }, 8000)
    return () => {
      renderManagerRef.current.stop()
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
          options={{
            playerInfos: [],
            cardIds: [],
          }}
        />
      )}
    </>
  )

  return null
}

export default GameGUI
