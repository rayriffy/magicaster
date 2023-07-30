import styled from 'styled-components'
import React from 'react'
import Title from '../Title'
import PlayerBoardRow from '../PlayerBoardRow'
import Capsule from '../Capsule'
import CharacterDisplayer from './CharacterDisplayer'
import { RenderManager } from '../../graphic/renderer'

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

const MAX_SLOT = 3
const PlanningGUI: React.FC<Props> = ({ renderManager, options }) => {
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
      <Title style={{ marginTop: '20px' }}>
        Choose Your Cards ({selectedCards.length} / {MAX_SLOT})
      </Title>
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
      {viewInfoCard !== null && (
        <div style={{ marginTop: 15 }}>
          {options.playerInfos.map(playerInfo => (
            <CharacterDisplayer
              characterIndex={playerInfo.characterIndex}
              renderManager={renderManager}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default PlanningGUI
