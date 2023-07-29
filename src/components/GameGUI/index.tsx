import React, { useEffect, useRef } from 'react'
import ChooseCharacterGUI, {
  MODE as ChooseCharacterGUIMode,
  Options as ChooseCharacterGUIOptions,
} from './ChooseCharacterGUI'
import LobbyGUI, {
  MODE as LobbyGUIMode,
  Options as LobbyGUIOptions,
} from './LobbyGUI'
import { RenderManager } from '../../graphic/renderer'

type GameGUIProps =
  | {
      mode: ChooseCharacterGUIMode
      options: ChooseCharacterGUIOptions
    }
  | {
      mode: LobbyGUIMode
      options: LobbyGUIOptions
    }

const GameGUI: React.FC<GameGUIProps> = ({ mode, options }) => {
  const renderManagerRef = useRef<RenderManager>(new RenderManager())

  useEffect(() => {
    renderManagerRef.current.start()
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
  return null
}

export default GameGUI
