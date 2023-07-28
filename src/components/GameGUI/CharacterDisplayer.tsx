import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { RenderManager, CharacterDisplayRenderer } from '../../graphic/renderer'

type Props = {
  renderManager: RenderManager
  size: string
}

const Container = styled.div<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  background-color: red;
  overflow: hidden;
  border-radius: 5px;
`

const CharacterDisplayer: React.FC<Props> = ({ renderManager, size }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const characterDisplayRendererRef = useRef<CharacterDisplayRenderer | null>(
    null
  )
  useEffect(() => {
    if (ref.current === null) return
    const characterDisplayRenderer = new CharacterDisplayRenderer(
      ref.current,
      '#fff'
    )
    characterDisplayRendererRef.current = characterDisplayRenderer
    renderManager.addRenderer(characterDisplayRenderer)

    ref.current.appendChild(characterDisplayRenderer.getCanvas())
    return () => {
      characterDisplayRenderer.destroy()
      renderManager.removeRenderer(characterDisplayRenderer)
    }
  }, [])
  return <Container ref={ref} size={size}></Container>
}

export default CharacterDisplayer
