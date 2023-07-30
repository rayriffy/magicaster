import { Renderer } from './types'
export { default as CharacterDisplayRenderer } from './characterDisplayRenderer'
export { default as GameDisplayRenderer } from './gameDisplayRenderer'

export class RenderManager {
  renderers: Renderer[] = []
  now: number = -1

  start = () => {
    this.now = Rune.gameTimeInSeconds()
    this.run()
  }

  run = () => {
    requestAnimationFrame(() => {
      if (this.now === -1) return
      const localNow = Rune.gameTimeInSeconds()
      const delta = localNow - this.now
      this.now = localNow
      for (let renderer of this.renderers) {
        renderer.loop(delta)
      }
      this.run()
    })
  }

  stop = () => {
    this.renderers = []
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

  get(): Renderer[] {
    return this.renderers
  }
}
