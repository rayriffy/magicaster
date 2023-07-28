import * as PIXI from 'pixi.js'
import assets from '../assets'
import { Renderer } from './types'

class CharacterDisplayScene implements Renderer {
  private app: PIXI.Application
  private size: number
  private characterSprite: PIXI.Sprite

  constructor(size: number, background?: string) {
    if (assets == null) throw "assets aren't load yet"
    this.size = size
    this.app = new PIXI.Application({ background: background ?? 'black' })
    this.app.screen.width = this.size
    this.app.screen.height = this.size

    this.characterSprite = new PIXI.Sprite(
      assets.wizard.spritesheet.textures['idleWizard']
    )
    const scale = (this.size * 0.8) / this.characterSprite.width
    this.characterSprite.scale.set(scale, scale)

    this.app.stage.addChild(this.characterSprite)
  }

  loop = () => {
    this.app.render()
  }
  getCanvas = () => {
    return this.app.view
  }

  destroy = () => {
    this.app.destroy()
  }
}

export default CharacterDisplayScene
