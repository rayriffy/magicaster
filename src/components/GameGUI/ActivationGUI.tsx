import styled from 'styled-components'
import React from 'react'
import Title from '../Title'
import { ActivatedCard } from '../../logic'
import { useRune } from '../../functions/useRune'

export type MODE = 'ACTIVATION_GUI'

export type Options = {
  cardPool: ActivatedCard[]
}

export type Props = {
  options: Options
}

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

const ActivationGUI: React.FC<Props> = ({ options }) => {
  const { playerId } = useRune()
  const effectedCards = options.cardPool.filter(
    activatedCard => activatedCard.to === playerId
  )

  if (effectedCards.length === 0) {
    return <Title style={{ marginTop: '20px' }}>You got no curse card!</Title>
  }

  return (
    <>
      <Title style={{ marginTop: '20px' }}>
        You got {effectedCards.length} curse cards!
      </Title>
      <ScrollableDiv>
        {effectedCards.map((card, index) => (
          <Card src={`./cards/${card.id}.png`} key={`card_${index}`} />
        ))}
      </ScrollableDiv>
    </>
  )
}

export default ActivationGUI
