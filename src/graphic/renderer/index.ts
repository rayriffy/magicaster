import { Renderer } from './types'

export class RenderManager {
  renderers: Renderer[] = []
  now: number = -1

  start = () => {
    this.now = Date.now()
    this.run()
  }

  run = () => {
    requestAnimationFrame(() => {
      if (this.now === -1) return
      const localNow = Date.now()
      const delta = localNow - this.now
      this.now = localNow
      for (let renderer of this.renderers) renderer.loop(delta)
      this.run()
    })
  }

  stop = () => {
    this.now = -1
  }

  addRenderer = (renderer: Renderer) => {
    if (this.renderers.includes(renderer)) return
    this.renderers.push(renderer)
  }

  removeRenderer = (renderer: Renderer) => {
    this.renderers = this.renderers.filter(
      oldRenderer => oldRenderer !== renderer
    )
  }
}
