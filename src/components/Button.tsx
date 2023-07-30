import styled from 'styled-components'

type ButtonColor = 'primary' | 'secondary' | 'danger'

const buttonColorMap: {
  primary: string
  secondary: string
  danger: string
} = {
  primary: '#724FD9',
  secondary: '#2C2247',
  danger: '#D94F4F',
}

const Button = styled.div<{ color?: ButtonColor }>`
  height: 50px;
  min-width: 230px;
  padding: 0px 30px;
  border-radius: 30px;
  background-color: ${({ color }) =>
    color ? buttonColorMap[color] : buttonColorMap.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  transition: 0.6s;
`

export default Button
