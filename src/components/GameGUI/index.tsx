import React from 'react'
import ChooseCharacterGUI, {
  MODE as ChooseCharacterGUIMode,
  Props as ChooseCharacterGUIProps,
} from './ChooseCharacterGUI'

type GameGUIProps = {
  mode: ChooseCharacterGUIMode
  props: ChooseCharacterGUIProps
}

const GameGUI: React.FC<GameGUIProps> = ({ mode, props }) => {
  if (mode === 'CHOOSE_CHARACTER_GUI') {
    return <ChooseCharacterGUI {...props} />
  }
  return null
}

export default GameGUI
