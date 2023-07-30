import styled from 'styled-components'
import React from 'react'
import Title from '../Title'
import PlayerBoardRow from '../PlayerBoardRow'
import Capsule from '../Capsule'

export type MODE = 'RANK_DISPLAY'

export type PlayerRankInfo = {
  playerID: string
  name: string
  avatarURL: string
  score: number
  cardNumber: number
}

export type Options = {
  playerRankInfos: PlayerRankInfo[]
  round: number
  totalRound: number
}

export type Props = {
  options: Options
}

const RankBoardContainer = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: grid;
  gap: 20px;
`

const CapsuleContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 10px;
`

const RankDisplayGUI: React.FC<Props> = ({ options }) => {
  return (
    <>
      <Title style={{ marginTop: '20px' }}>
        Round {options.round} / {options.totalRound} Ended
      </Title>
      <RankBoardContainer style={{ marginTop: '10px' }}>
        {options.playerRankInfos.map(
          ({ playerID, name, avatarURL, score, cardNumber }) => {
            return (
              <PlayerBoardRow key={playerID} name={name} avatarUrl={avatarURL}>
                <CapsuleContainer>
                  <Capsule backgroundColor="#F5F92E" fontColor="#444444">
                    SCORE: {score.toFixed(2)}
                  </Capsule>
                  <Capsule backgroundColor="#424242">
                    CARD: {cardNumber}
                  </Capsule>
                </CapsuleContainer>
              </PlayerBoardRow>
            )
          }
        )}
      </RankBoardContainer>
    </>
  )
}

export default RankDisplayGUI
