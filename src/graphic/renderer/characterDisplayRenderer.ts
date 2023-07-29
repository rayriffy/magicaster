import * as PIXI from 'pixi.js'
import { getAssets } from '../assets'
import { Renderer, Vec3 } from './types'
import CharacterRenderer from './characterRenderer'

type Params = {
  parent: HTMLElement
  background?: string
  primaryColor?: Vec3
  secondaryColor?: Vec3
  isDisable?: boolean
}

class CharacterDisplayRenderer implements Renderer {
  private app: PIXI.Application<HTMLCanvasElement>
  private size: number
  private parent: HTMLElement
  private characterRenderer: CharacterRenderer

  constructor({
    parent,
    background,
    primaryColor,
    secondaryColor,
    isDisable,
  }: Params) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"

    this.parent = parent
    this.size = parent.getBoundingClientRect().width
    this.characterRenderer = new CharacterRenderer({
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      isDisable: isDisable,
      size: this.size,
      originPosition: [this.size / 2, this.size / 2],
    })
    this.app = new PIXI.Application({ background: background ?? 'black' })

    this.app.view.width = this.size
    this.app.view.height = this.size

    this.app.stage.addChild(this.characterRenderer.getSprite())
  }

  loop = (delta: number) => {
    this.app.render()
    this.characterRenderer.loop(delta)
  }

  updateSizeToParent = () => {
    this.app.resizeTo = this.parent
  }

  getCanvas = () => {
    return this.app.view
  }

  destroy = () => {
    this.app.destroy()
  }

  getCharacterRenderer = (): CharacterRenderer => {
    return this.characterRenderer
  }
}

export default CharacterDisplayRenderer
