import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import GameGraphicDisplayer from './GameGraphicDisplayer'
import { GameDisplayRenderer, RenderManager } from '../../graphic/renderer'
import Paragraph from '../Paragraph'
import Title from '../Title'
import Container from '../Container'
import { Renderer } from '../../graphic/renderer/types'

export type MODE = 'WORD_ORDERING'

export type Options = {
  score: number
  deadline: number
}

export type Props = {
  gameDisplayRenderer: GameDisplayRenderer
  renderManager: RenderManager
  options: Options
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
`

class TimerRenderer implements Renderer {
  private elem: HTMLDivElement
  private deadline: number
  constructor(elem: HTMLDivElement, deadline: number) {
    this.elem = elem
    this.deadline = deadline
  }

  loop(): void {
    const remain = Math.max(this.deadline - Date.now(), 0)
    const remainSec = Math.floor(remain / 1000)
    const remainMin = Math.floor(remainSec / 60)
    const min = Math.floor(remainMin % 60) + ''
    const sec = Math.floor(remainSec % 60) + ''
    const minString =
      Array(Math.max(2 - min.length, 0))
        .fill('0')
        .join('') + min
    const secString =
      Array(Math.max(2 - sec.length, 0))
        .fill('0')
        .join('') + sec
    this.elem.innerHTML = `${minString}:${secString}`
  }
}

const WordOrderingGUI: React.FC<Props> = ({
  gameDisplayRenderer,
  renderManager,
  options,
}) => {
  const timerRef = useRef<HTMLDivElement | null>(null)
  const timerRendererRef = useRef<TimerRenderer | null>(null)

  useEffect(() => {
    if (timerRef.current == null) return
    const timerRenderer = new TimerRenderer(timerRef.current, options.deadline)
    timerRendererRef.current = timerRenderer
    renderManager.addRenderer(timerRenderer)
    return () => renderManager.removeRenderer(timerRenderer)
  }, [])

  return (
    <>
      <Header>
        <Paragraph>SCORE: {options.score ?? 0}</Paragraph>
        <Title>
          <div ref={timerRef}></div>
        </Title>
      </Header>
      <GameGraphicDisplayer gameDisplayRenderer={gameDisplayRenderer} />
    </>
  )
}

export default WordOrderingGUI
