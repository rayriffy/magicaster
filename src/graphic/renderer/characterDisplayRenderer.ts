import * as PIXI from 'pixi.js'
import { getAssets } from '../assets'
import { Renderer } from './types'

const colorFragmentShader = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
  vec4 textureColor = texture2D(uSampler, vTextureCoord);
  bool isPrimaryColor = abs(dot(vec4(4, 0, 103, 1)/ 256. * -1., textureColor)) < 0.01;
  if(isPrimaryColor){
    gl_FragColor = vec4(0, 0, 0, 1);
    return;
  }
  gl_FragColor = textureColor;
}
`

function getColorFilter(): PIXI.Filter {
  return new PIXI.Filter(undefined, colorFragmentShader)
}

class CharacterDisplayRenderer implements Renderer {
  private app: PIXI.Application<HTMLCanvasElement>
  private size: number
  private characterSprite: PIXI.Sprite
  private randomValue: number = Math.random()
  private parent: HTMLElement

  constructor(parent: HTMLElement, background?: string) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"
    this.parent = parent
    this.size = parent.getBoundingClientRect().width
    this.app = new PIXI.Application({ background: background ?? 'black' })
    this.app.resizeTo = this.parent

    this.characterSprite = new PIXI.Sprite(
      assets.wizard.spritesheet.textures['idleWizard']
    )
    this.characterSprite.filters = [getColorFilter()]
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
