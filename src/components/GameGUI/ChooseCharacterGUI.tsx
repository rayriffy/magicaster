import React from 'react'
import Container from '../Container'
import Title from '../Title'
import CharacterDisplayer from './CharacterDisplayer'
import { RenderManager } from '../../graphic/renderer'
import Button from '../Button'

import styled from 'styled-components'
import { CHARACTER_NUMBER } from './const'
import Paragraph from '../Paragraph'

export type MODE = 'CHOOSE_CHARACTER_GUI'
export type characterSelections = { [playerID: string]: number }
export type Options = {
  playerID: string
  characterSelections: characterSelections
  onSelect?: (index: number) => void
  onSubmit?: () => void
}
export type Props = {
  options: Options
  renderManager: RenderManager
}

const CharacterDisplayersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-content: center;
`

const PreviewCharacterDisplayerContainer = styled.div`
  height: max-content;
  margin: 20px 0px;
`

const Arranger = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: max-content max-content max-content 1fr;
`

const ChooseCharacterGUI: React.FC<Props> = ({ renderManager, options }) => {
  const characterIndex = options.characterSelections[options.playerID] ?? 0

  return (
    <Container>
      <Arranger>
        <Title style={{ marginTop: '30px' }}>Choose Character</Title>
        <PreviewCharacterDisplayerContainer>
          <CharacterDisplayer
            renderManager={renderManager}
            characterIndex={characterIndex}
          />
        </PreviewCharacterDisplayerContainer>
        <CharacterDisplayersContainer>
          {Array(CHARACTER_NUMBER)
            .fill(1)
            .map((_, index) => {
              const isSelected = Object.values(
                options.characterSelections
              ).includes(index)

              const isMySelect = index === characterIndex
              return (
                <CharacterDisplayer
                  key={index}
                  renderManager={renderManager}
                  characterIndex={index}
                  disabled={isSelected && !isMySelect}
                  onClick={() => {
                    if (isSelected) return
                    if (options.onSelect) options.onSelect(index)
                  }}
                  isHighLight={isMySelect}
                />
              )
            })}
        </CharacterDisplayersContainer>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: '30px 0px' }} onClick={options.onSubmit}>
            <Paragraph>Join the room</Paragraph>
          </Button>
        </div>
      </Arranger>
    </Container>
  )
}

export default ChooseCharacterGUI
