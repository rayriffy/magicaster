import React from 'react'
import Container from '../Container'
import Title from '../Title'
import Button from '../Button'

import styled from 'styled-components'
import PlayerBoardRow, { Props as PlayerBoardRowProps } from '../PlayerBoardRow'

export type MODE = 'LOBBY_GUI'

export type PlayerLobbyInfo = {
  name: string
  playerID: string
  avatarUrl: string
  isReady: boolean
}

export type Options = {
  playerID: string
  playerLobbyInfos: PlayerLobbyInfo[]
}

export type Props = {
  options: Options
}

const Arranger = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  /* grid-template-rows: max-content max-content max-content 1fr; */
  gap: 10px;
`

const PlayerBoardContainer = styled.div`
  display: grid;
  gap: 20px;
`

const LobbyGUI: React.FC<Props> = ({ options }) => {
  return (
    <Container>
      <Arranger>
        <Title style={{ marginTop: '30px', marginBottom: '20px' }}>Lobby</Title>
        <PlayerBoardContainer>
          {options.playerLobbyInfos.map(info => {
            return <PlayerBoardRow key={info.playerID} {...info} />
          })}
        </PlayerBoardContainer>
        <Button style={{ margin: '30px 0px' }}>
          <Title>Ready</Title>
        </Button>
      </Arranger>
    </Container>
  )
}

export default LobbyGUI
