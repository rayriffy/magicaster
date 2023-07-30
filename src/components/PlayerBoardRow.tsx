import React from 'react'
import styled from 'styled-components'
import Paragraph from './Paragraph'

export type Props = {
  name: string
  playerID: string
  avatarUrl: string
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: max-content 1fr;
  padding: 10px 20px;
  background-color: #845bfa;
  border-radius: 10px;
  gap: 15px;
`

const AVATAR_SIZE = 70

const Avatar = styled.div<{ url: string }>`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  border-radius: ${AVATAR_SIZE / 2}px;
  background-image: url(${({ url }) => url});
`

const InfoLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
`

const PlayerBoardRow: React.FC<React.PropsWithChildren<Props>> = ({
  name,
  avatarUrl,
  children,
}) => {
  return (
    <Container>
      <Avatar url={avatarUrl} />
      <InfoLayout>
        <div>
          <Paragraph className='line-clamp-1' style={{ fontWeight: 'bold' }}>{name}</Paragraph>
        </div>
        <div>{children}</div>
      </InfoLayout>
    </Container>
  )
}

export default PlayerBoardRow
