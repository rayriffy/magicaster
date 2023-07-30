import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import CardNumberIcon from '../CardNumberIcon'

export type MODE = 'WORD_ORDERING'

export type SlotInfo = {
  id: string
  character: string
  isDisable: boolean
}

export type Options = {
  slotInfos: SlotInfo[]
  cardNumber: number
  onSpell?: (word: string) => void
}

export type Props = {
  options: Options
}

const SLOT_GAP = 10
const SLOT_COLUMS = 4
const MAX_CHARACTER = 8

const SloteContainer = styled.div<{ columnNumber: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    ${({ columnNumber }) => columnNumber},
    max-content
  );
  gap: ${SLOT_GAP}px;
`

const Slot = styled.div<{ size: number; disable: boolean; selected: boolean }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: white;
  border-radius: 5px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
  border-width: ${({ selected, disable }) =>
    selected && !disable ? '5px' : '0px'};
  border-color: #845bfa;
  transition: 0.3s;
`

const Container = styled.div`
  padding: 0px 20px;
  position: relative;
`

const WordPreviewContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`

const WordContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${MAX_CHARACTER}, 20px);
  gap: 3px;
  > div {
    font-weight: bold;
    color: white;
    font-size: 28px;
  }
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0px;
`

const CardNumberIconContainer = styled.div`
  position: absolute;
  height: 80px;
  width: 60px;
  transform: translate(-100%, -100%);
  top: 0px;
  left: calc(100% - 20px);
`

const WordOrderingGUI: React.FC<Props> = ({ options }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState<number>(0)
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([])

  useEffect(() => {
    if (containerRef.current === null) return
    const newWidth = containerRef.current?.getBoundingClientRect().width
    setWidth(newWidth)
  }, [])
  const slotSize = (width - (SLOT_COLUMS - 1) * SLOT_GAP) / SLOT_COLUMS

  return (
    <Container>
      <CardNumberIconContainer>
        <CardNumberIcon number={options.cardNumber} />
      </CardNumberIconContainer>
      <WordPreviewContainer>
        <WordContainer>
          {[
            ...selectedCharacters,
            ...Array(MAX_CHARACTER - selectedCharacters.length).fill(-1),
          ].map((charIndex, index) => (
            <div key={`preview-character-${index}`}>
              {charIndex === -1 ? '_' : options.slotInfos[charIndex].character}
            </div>
          ))}
        </WordContainer>
      </WordPreviewContainer>
      <SloteContainer ref={containerRef} columnNumber={SLOT_COLUMS}>
        {options.slotInfos.map(({ id, character, isDisable }, index) => {
          const isSelected = selectedCharacters.includes(index)
          return (
            <Slot
              id={id}
              size={slotSize}
              disable={isDisable}
              selected={isSelected}
              onClick={() => {
                if (isSelected) {
                  setSelectedCharacters(
                    selectedCharacters.filter(value => value !== index)
                  )
                } else {
                  if (MAX_CHARACTER === selectedCharacters.length) return
                  setSelectedCharacters([...selectedCharacters, index])
                }
              }}
            >
              {character}
            </Slot>
          )
        })}
      </SloteContainer>
      <Footer>
        <Button
          onClick={() => {
            if (selectedCharacters.length === 0) return
            if (options.onSpell)
              options.onSpell(
                selectedCharacters
                  .map(index => options.slotInfos[index].character)
                  .join('')
              )
            setSelectedCharacters([])
          }}
        >
          Spell !!
        </Button>
      </Footer>
    </Container>
  )
}

export default WordOrderingGUI
