import { DisplayObjectSpace, Renderer } from './types'
import { IEffectRenderer } from './effects/types'

export type Queue = {
  renderer: IEffectRenderer
  onSuccess?: () => void
  onStart?: () => void
}

class EffectQueueRenderer implements Renderer {
  private effectRendererQueue: Queue[] = []
  private activeQueue: Queue | null = null
  private displayObjectSpace: DisplayObjectSpace

  constructor(displayObjectSpace: DisplayObjectSpace) {
    this.displayObjectSpace = displayObjectSpace
  }

  addEffect(queue: Queue) {
    this.effectRendererQueue.push(queue)
  }

  removeQueue(queue: Queue) {
    this.effectRendererQueue = this.effectRendererQueue.filter(
      value => value !== queue
    )
  }

  loop(delta: number): void {
    if (this.activeQueue === null) {
      if (this.effectRendererQueue.length === 0) return
      this.activeQueue = this.effectRendererQueue[0]
      this.displayObjectSpace.addChild(
        this.activeQueue.renderer.getDisplayObject()
      )
      this.removeQueue(this.activeQueue)
      if (this.activeQueue.onStart) this.activeQueue.onStart()
    }

    const isDone = this.activeQueue.renderer.loop(delta)

    if (isDone) {
      if (this.activeQueue.onSuccess) this.activeQueue.onSuccess()
      this.displayObjectSpace.removeChild(
        this.activeQueue.renderer.getDisplayObject()
      )
      this.activeQueue = null
    }
  }
}

export default EffectQueueRenderer
