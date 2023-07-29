import * as PIXI from 'pixi.js'
import { getAssets } from '../assets'
import { Renderer } from './types'
import TrackRenderer from './trackRenderer'

type Params = {
  width: number
}
class GameDisplayRenderer implements Renderer {
  private app: PIXI.Application<HTMLCanvasElement>
  private width: number
  private height: number

  private trackRenderer: TrackRenderer

  constructor({ width }: Params) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"
    this.app = new PIXI.Application({ backgroundAlpha: 0 })
    this.width = width
    this.height = 0.6 * width
    this.app.view.width = this.width
    this.app.view.height = this.height

    // set up track
    this.trackRenderer = new TrackRenderer({ width })
    this.trackRenderer.getSprite().position = { x: 0, y: 0 }
    this.app.stage.addChild(this.trackRenderer.getSprite())
    this.trackRenderer.start()
  }

  loop = (delta: number) => {
    this.trackRenderer.loop(delta)
    this.app.render()
  }

  getCanvas = () => {
    return this.app.view
  }

  destroy = () => {
    this.app.destroy()
  }
}

export default GameDisplayRenderer
