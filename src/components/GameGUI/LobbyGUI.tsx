import React, { useMemo } from 'react'
import Container from '../Container'
import Title from '../Title'
import Button from '../Button'

import styled from 'styled-components'
import PlayerBoardRow from '../PlayerBoardRow'
import Paragraph from '../Paragraph'

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
  onReady?: () => void
  onCancel?: () => void
}

export type Props = {
  options: Options
}

const Arranger = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  gap: 10px;
`

const PlayerBoardContainer = styled.div`
  display: grid;
  gap: 20px;
`

const StatusCapsule = styled.div<{ backgroundColor: string }>`
  width: 100px;
  height: 30px;
  border-radius: 50px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LobbyGUI: React.FC<Props> = ({ options }) => {
  const isReady = useMemo(
    () =>
      options.playerLobbyInfos.find(
        playerInfo => playerInfo.playerID === options.playerID
      )?.isReady || false,
    [options.playerLobbyInfos, options.playerID]
  )

  return (
    <Container style={{ minHeight: '100%' }}>
      <Arranger>
        <Title style={{ marginTop: '30px', marginBottom: '20px' }}>Lobby</Title>
        <PlayerBoardContainer>
          {options.playerLobbyInfos.map(info => {
            return (
              <PlayerBoardRow key={info.playerID} {...info}>
                <StatusCapsule
                  backgroundColor={info.isReady ? '#51D94F' : '#D94F4F'}
                >
                  {info.isReady ? 'Ready' : 'Not ready'}
                </StatusCapsule>
              </PlayerBoardRow>
            )
          })}
        </PlayerBoardContainer>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{ margin: '30px 0px' }}
            color={!isReady ? 'primary' : 'danger'}
            onClick={() => {
              if (isReady && options.onCancel) options.onCancel()
              if (!isReady && options.onReady) options.onReady()
            }}
          >
            <Paragraph>{!isReady ? 'Ready' : 'Cancel'}</Paragraph>
          </Button>
        </div>
      </Arranger>
    </Container>
  )
}

export default LobbyGUI
