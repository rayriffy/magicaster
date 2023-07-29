import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { RenderManager, CharacterDisplayRenderer } from '../../graphic/renderer'
import { CHARACTER_COLOR_LIST } from './const'

type Props = {
  renderManager: RenderManager
  size: string
  characterIndex: number
  onClick?: () => void
  style?: React.CSSProperties
  disabled?: boolean
}

const Container = styled.div<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  background-color: red;
  overflow: hidden;
  border-radius: 5px;
`

const CharacterDisplayer: React.FC<Props> = ({
  renderManager,
  size,
  characterIndex,
  onClick,
  style,
  disabled,
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
      size={size}
      onClick={onClick}
      style={style}
    ></Container>
  )
}

export default CharacterDisplayer
