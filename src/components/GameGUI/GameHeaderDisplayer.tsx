import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { RenderManager } from '../../graphic/renderer'
import Paragraph from '../Paragraph'
import Title from '../Title'
import { Renderer } from '../../graphic/renderer/types'

export type Options = {
  score: number
  deadline: number
}
export type Props = {
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
    const remainSec = Math.max(this.deadline - Rune.gameTimeInSeconds(), 0)
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

  setDeadline = (newDeadline: number) => {
    this.deadline = newDeadline
  }
}

const GameHeaderDisplayer: React.FC<React.PropsWithChildren<Props>> = ({
  renderManager,
  options,
}) => {
  const { score, deadline } = options
  const timerRef = useRef<HTMLDivElement | null>(null)
  const timerRendererRef = useRef<TimerRenderer | null>(null)

  useEffect(() => {
    if (timerRef.current == null) return
    const timerRenderer = new TimerRenderer(timerRef.current, deadline)
    renderManager.addRenderer(timerRenderer)
    timerRendererRef.current = timerRenderer
    return () => renderManager.removeRenderer(timerRenderer)
  }, [])

  useEffect(() => {
    if (timerRendererRef.current == null) return
    timerRendererRef.current.setDeadline(deadline)
  }, [deadline])

  return (
    <Header>
      <Paragraph>SCORE: {score ?? 0}</Paragraph>
      <Title>
        <div ref={timerRef}></div>
      </Title>
    </Header>
  )
}

export default GameHeaderDisplayer
