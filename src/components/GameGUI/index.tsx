import React, { useEffect, useRef } from 'react'
import ChooseCharacterGUI, {
  MODE as ChooseCharacterGUIMode,
  // Props as ChooseCharacterGUIProps,
  Options,
} from './ChooseCharacterGUI'
import { RenderManager } from '../../graphic/renderer'

type GameGUIProps = {
  mode: ChooseCharacterGUIMode
  options: Options
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
  return null
}

export default GameGUI
