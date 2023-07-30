import styled from 'styled-components'
import React from 'react'
import Title from '../Title'
import CharacterDisplayer from './CharacterDisplayer'
import { RenderManager } from '../../graphic/renderer'
import Button from '../Button'

export type MODE = 'PLANNING_GUI'

export type PlayerInfo = {
  playerID: string
  name: string
  characterIndex: number
}

export type Options = {
  playerInfos: PlayerInfo[]
  cardIds: string[]
}

export type Props = {
  renderManager: RenderManager
  options: Options
}

// const CardSlotContainer = styled.div`
//   width: 200px;
//   display: flex;
//   padding: 0px 15px;
//   justify-content: space-between;
//   background: #845bfa;
//   border-radius: 7px;
//   margin-top: 10px;
//   position: relative;
//   left: 50%;
//   transform: translateX(-50%);

//   & div {
//     width: 40px;
//     height: 40px;
//   }
// `

const ScrollableDiv = styled.div`
  display: flex;
  overflow-x: auto;
  margin-top: 15px;
  width: 100%;
`

const Card = styled.img`
  flex: 0 0 auto;
  margin-right: 10px;
  width: 100px;
  height: auto;
`
const CharacterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin-top: 15px;
  width: 100%;
`

const MAX_SLOT = 3
const PlanningGUI: React.FC<Props> = ({ renderManager, options }) => {
  const [selectedCards, setSelectedCards] = React.useState<number[]>([])
  const [viewInfoCard, setViewInfoCard] = React.useState<number | null>(null)
  const [characterIndex, setCharacterIndex] = React.useState<number | null>(
    null
  )

  const selectCard = (cardIndex: number, targetPlayerId: string) => {
    if (selectedCards.length >= MAX_SLOT) {
      return
    }

    setViewInfoCard(null)
    setCharacterIndex(null)
    setSelectedCards(cards => [...cards, cardIndex])

    Rune.actions.applyCard({
      id: options.cardIds[cardIndex],
      to: targetPlayerId,
    })
  }

  if (options.cardIds.length === 0) {
    return (
      <Title style={{ marginTop: '20px' }}>
        Please wait for other players...
      </Title>
    )
  }

  return (
    <>
      <Title style={{ marginTop: '20px' }}>
        Choose Your Cards ({selectedCards.length} / {MAX_SLOT})
      </Title>
      <ScrollableDiv>
        {options.cardIds.map((cardId, index) => (
          <Card
            onClick={() => {
              if (selectedCards.includes(index)) return
              setViewInfoCard(index)
            }}
            src={`./cards/${cardId}.png`}
            key={`card_${index}`}
            style={{
              opacity: selectedCards.includes(index) ? 0.5 : 1,
            }}
          />
        ))}
      </ScrollableDiv>
      {viewInfoCard !== null && (
        <>
          <CharacterContainer style={{ marginTop: 15 }}>
            {options.playerInfos.map(playerInfo => (
              <CharacterDisplayer
                characterIndex={playerInfo.characterIndex}
                renderManager={renderManager}
                onClick={() => {
                  setCharacterIndex(playerInfo.characterIndex)
                }}
              />
            ))}
          </CharacterContainer>

          {characterIndex !== null && (
            <Button
              onClick={() => {
                selectCard(
                  viewInfoCard,
                  options.playerInfos[characterIndex].playerID
                )
              }}
            >
              Confirm
            </Button>
          )}
          <Button
            onClick={() => {
              setViewInfoCard(null)
              setCharacterIndex(null)
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  )
}

export default PlanningGUI
