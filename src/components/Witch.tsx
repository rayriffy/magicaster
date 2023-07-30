import witchSprite from '../assets/sprites/wizard.png'
import styled from 'styled-components'

export const Witch = styled.div`
  width: 64px;
  height: 64px;
  background-image: url(${witchSprite});
  background-position: 0px 0px;
  background-repeat: no-repeat;
  display: inline-block;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`
