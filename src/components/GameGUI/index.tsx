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

import { GameDisplayRenderer, RenderManager } from '../../graphic/renderer'
import { CHARACTER_COLOR_LIST } from './const'

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
      options: WordOrderingGUIOptions
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
      gameDisplayRendererRef.current.animatePosition('RUNNING')
    }, 2000)
    setTimeout(() => {
      gameDisplayRendererRef.current.characterScore =
        gameDisplayRendererRef.current.characterScore.map(() =>
          Math.floor(Math.random() * 300)
        )
      gameDisplayRendererRef.current.animatePosition('RUNNING')
    }, 4000)
    setTimeout(() => {
      gameDisplayRendererRef.current.animatePosition('END')
    }, 8000)
    return renderManagerRef.current.stop
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

  if (mode === 'WORD_ORDERING') {
    return (
      <WordOrderingGUI
        gameDisplayRenderer={gameDisplayRendererRef.current}
        options={{}}
      />
    )
  }

  return null
}

export default GameGUI
