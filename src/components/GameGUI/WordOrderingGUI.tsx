import React from 'react'
import GameGraphicDisplayer from './GameGraphicDisplayer'
import { GameDisplayRenderer } from '../../graphic/renderer'

export type MODE = 'WORD_ORDERING'

export type Options = {}

export type Props = {
  gameDisplayRenderer: GameDisplayRenderer
  options: Options
}

const WordOrderingGUI: React.FC<Props> = ({ gameDisplayRenderer }) => {
  return (
    <>
      <GameGraphicDisplayer gameDisplayRenderer={gameDisplayRenderer} />
    </>
  )
}

export default WordOrderingGUI
