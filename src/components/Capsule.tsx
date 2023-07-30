import styled from 'styled-components'

const Capsule = styled.div<{ backgroundColor: string; fontColor?: string }>`
  width: 100px;
  height: 30px;
  border-radius: 50px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ fontColor }) => fontColor ?? 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Capsule
