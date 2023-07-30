import styled from 'styled-components'
import React from 'react'
import Title from '../Title'
import PlayerBoardRow from '../PlayerBoardRow'
import Capsule from '../Capsule'

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
  options: Options
}

const CardSlotContainer = styled.div`
  width: 200px;
  display: flex;
  padding: 0px 15px;
  justify-content: space-between;
  background: #845bfa;
  border-radius: 7px;
  margin-top: 10px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  & div {
    width: 40px;
    height: 40px;
  }
`

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
  background: green;
`

const MAX_SLOT = 3
const PlanningGUI: React.FC<Props> = ({ options }) => {
  const [selectedCards, setSelectedCards] = React.useState<number[]>([])
  const [viewInfoCard, setViewInfoCard] = React.useState<number | null>(null)

  const selectCard = (index: number) => {
    if (selectedCards.length >= MAX_SLOT) {
      return
    }

    setViewInfoCard(null)
    setSelectedCards(cards => [...cards, index])
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
      <Title style={{ marginTop: '20px' }}>Choose Your Cards</Title>
      <CardSlotContainer>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </CardSlotContainer>
      <ScrollableDiv>
        {options.cardIds.map((cardId, index) => (
          <Card
            onClick={() => {
              setViewInfoCard(index)
            }}
            src={`./cards/${cardId}.png`}
            key={`card_${index}`}
          />
        ))}
      </ScrollableDiv>
      {viewInfoCard !== null && <div>Hi there eiei</div>}
    </>
  )
}

export default PlanningGUI
