import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { GameDisplayRenderer } from '../../graphic/renderer'

const Container = styled.div`
  width: 100%;
`

type Props = {
  gameDisplayRenderer: GameDisplayRenderer
}

const GameGraphicDisplayer: React.FC<Props> = ({ gameDisplayRenderer }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (containerRef.current === null) return
    containerRef.current.appendChild(gameDisplayRenderer.getCanvas())
  }, [])
  return <Container ref={containerRef}></Container>
}

export default GameGraphicDisplayer
