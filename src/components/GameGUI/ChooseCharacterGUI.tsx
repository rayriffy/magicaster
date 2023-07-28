import React from 'react'
import Container from '../Container'
import Title from '../Title'

// const CHARACTER_NUMBER = 8

export type MODE = 'CHOOSE_CHARACTER_GUI'
export type characterSelections = { [playerID: string]: number }
export type Props = {
  playerID: string
  characterSelections: characterSelections
  onSubmit: (characterSelections: characterSelections) => void
}

const ChooseCharacterGUI: React.FC<Props> = () => {
  return (
    <Container>
      <Title style={{ marginTop: '30px' }}>Choose Character</Title>
    </Container>
  )
}

export default ChooseCharacterGUI
