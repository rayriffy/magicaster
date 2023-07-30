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

const PlanningGUI: React.FC<Props> = ({ options }) => {
  return (
    <>
      <Title style={{ marginTop: '20px' }}>Choose Your Cards</Title>
      <CardSlotContainer>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </CardSlotContainer>
      {/* <RankBoardContainer style={{ marginTop: '10px' }}>
        {options.playerRankInfos.map(
          ({ playerID, name, avatarURL, score, cardNumber }) => {
            return (
              <PlayerBoardRow key={playerID} name={name} avatarUrl={avatarURL}>
                <CapsuleContainer>
                  <Capsule backgroundColor="#F5F92E" fontColor="#444444">
                    SCORE: {score}
                  </Capsule>
                  <Capsule backgroundColor="#424242">
                    CARD: {cardNumber}
                  </Capsule>
                </CapsuleContainer>
              </PlayerBoardRow>
            )
          }
        )}
      </RankBoardContainer> */}
    </>
  )
}

export default PlanningGUI
