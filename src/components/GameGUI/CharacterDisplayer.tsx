import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { RenderManager, CharacterDisplayRenderer } from '../../graphic/renderer'
import { CHARACTER_COLOR_LIST } from './const'

type Props = {
  renderManager: RenderManager
  characterIndex: number
  onClick?: () => void
  disabled?: boolean
  isHighLight?: boolean
}

const Container = styled.div<{ isHighLight: boolean }>`
  width: 100%;
  > canvas {
    border-radius: 5px;
    outline: ${({ isHighLight }) => (isHighLight ? 4 : 0)}px solid #724fd9;
    transition: 0.3s;
  }
`

const CharacterDisplayer: React.FC<Props> = ({
  renderManager,
  characterIndex,
  onClick,
  disabled,
  isHighLight,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const characterDisplayRendererRef = useRef<CharacterDisplayRenderer | null>(
    null
  )

  useEffect(() => {
    if (characterDisplayRendererRef.current === null) return
    const characterColor = CHARACTER_COLOR_LIST[characterIndex]
    characterDisplayRendererRef.current.primaryColor = characterColor.primary
    characterDisplayRendererRef.current.secondaryColor =
      characterColor.secondary
  }, [characterIndex])

  useEffect(() => {
    if (characterDisplayRendererRef.current === null) return
    characterDisplayRendererRef.current.isDisable = disabled ?? false
  }, [disabled])

  useEffect(() => {
    if (ref.current === null) return
    const characterColor = CHARACTER_COLOR_LIST[characterIndex]
    const characterDisplayRenderer = new CharacterDisplayRenderer({
      parent: ref.current,
      background: '#fff',
      primaryColor: characterColor.primary,
      secondaryColor: characterColor.secondary,
      isDisable: disabled,
    })
    characterDisplayRendererRef.current = characterDisplayRenderer
    renderManager.addRenderer(characterDisplayRenderer)

    ref.current.appendChild(characterDisplayRenderer.getCanvas())
    return () => {
      characterDisplayRenderer.destroy()
      renderManager.removeRenderer(characterDisplayRenderer)
    }
  }, [])
  return (
    <Container
      ref={ref}
      onClick={onClick}
      isHighLight={isHighLight ?? false}
    ></Container>
  )
}

export default CharacterDisplayer
