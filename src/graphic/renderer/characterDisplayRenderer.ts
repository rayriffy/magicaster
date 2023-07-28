import * as PIXI from 'pixi.js'
import { getAssets } from '../assets'
import { Renderer } from './types'

class CharacterDisplayRenderer implements Renderer {
  private app: PIXI.Application<HTMLCanvasElement>
  private size: number
  private characterSprite: PIXI.Sprite
  private randomValue: number = Math.random()

  constructor(parent: HTMLElement, background?: string) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"

    this.size = parent.getBoundingClientRect().width
    this.app = new PIXI.Application({ background: background ?? 'black' })
    this.app.resizeTo = parent

    this.characterSprite = new PIXI.Sprite(
      assets.wizard.spritesheet.textures['idleWizard']
    )
    const scale = (this.size * 0.7) / this.characterSprite.width
    this.characterSprite.scale.set(scale, scale)
    this.characterSprite.position.set(this.size / 2, this.size / 2)
    this.characterSprite.anchor.set(0.5, 0.55)

    this.app.stage.addChild(this.characterSprite)
  }

  loop = () => {
    this.app.render()
    this.characterSprite.position.y =
      Math.sin(Date.now() / 500 + this.randomValue * 500) * this.size * 0.05 +
      this.size / 2
  }
  getCanvas = () => {
    return this.app.view
  }

  destroy = () => {
    this.app.destroy()
  }
}

export default CharacterDisplayRenderer
