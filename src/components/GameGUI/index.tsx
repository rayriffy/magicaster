import React, { useEffect, useRef } from 'react'
import ChooseCharacterGUI, {
  MODE as ChooseCharacterGUIMode,
  Props as ChooseCharacterGUIProps,
} from './ChooseCharacterGUI'
import { RenderManager } from '../../graphic/renderer'

type GameGUIProps = {
  mode: ChooseCharacterGUIMode
  props: ChooseCharacterGUIProps
}

const GameGUI: React.FC<GameGUIProps> = ({ mode, props }) => {
  const renderManagerRef = useRef<RenderManager>(new RenderManager())

  useEffect(() => {
    renderManagerRef.current.start()
    return renderManagerRef.current.stop
  }, [])

  if (mode === 'CHOOSE_CHARACTER_GUI') {
    return <ChooseCharacterGUI {...props} />
  }
  return null
}

export default GameGUI
