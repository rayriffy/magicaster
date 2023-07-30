import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 80px;
  width: 60px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4a4a4a;
  border-radius: 5px;
  border-width: 5px;
  border-color: #845bfa;
  color: white;
  font-size: 24px;
`

type Props = {
  number: number
}

const CardNumberIcon: React.FC<Props> = ({ number }) => {
  return <Container>{number}</Container>
}

export default CardNumberIcon
