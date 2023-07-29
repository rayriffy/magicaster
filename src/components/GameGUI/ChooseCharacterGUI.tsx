import React, { useState } from 'react'
import Container from '../Container'
import Title from '../Title'
import CharacterDisplayer from './CharacterDisplayer'
import { RenderManager } from '../../graphic/renderer'
import Button from '../Button'

import styled from 'styled-components'
import { CHARACTER_NUMBER } from './const'

export type MODE = 'CHOOSE_CHARACTER_GUI'
export type characterSelections = { [playerID: string]: number }
export type Options = {
  playerID: string
  characterSelections: characterSelections
  onSubmit: (characterSelections: characterSelections) => void
}
export type Props = {
  options: Options
  renderManager: RenderManager
}

const CharacterDisplayersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  gap: 10px;
  justify-content: center;
`

const PreviewCharacterDisplayerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px;
`

const Arranger = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: max-content max-content 1fr max-content;
`

const ChooseCharacterGUI: React.FC<Props> = ({ renderManager, options }) => {
  const [characterIndex, setCharacterIndex] = useState<number>(
    options.characterSelections[options.playerID] ?? 0
  )
  return (
    <Container>
      <Arranger>
        <Title style={{ marginTop: '30px' }}>Choose Character</Title>
        <PreviewCharacterDisplayerContainer>
          <CharacterDisplayer
            size="250px"
            renderManager={renderManager}
            characterIndex={characterIndex}
          />
        </PreviewCharacterDisplayerContainer>
        <div>
          <CharacterDisplayersContainer>
            {Array(CHARACTER_NUMBER)
              .fill(1)
              .map((_, index) => {
                return (
                  <CharacterDisplayer
                    size="55px"
                    key={index}
                    renderManager={renderManager}
                    characterIndex={index}
                    onClick={() => setCharacterIndex(index)}
                  />
                )
              })}
          </CharacterDisplayersContainer>
        </div>
        <Button style={{ margin: '30px 0px' }}>
          <Title>Join the room</Title>
        </Button>
      </Arranger>
    </Container>
  )
}

export default ChooseCharacterGUI
