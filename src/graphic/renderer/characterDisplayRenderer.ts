import * as PIXI from 'pixi.js'
import { getAssets } from '../assets'
import { Renderer, Vec3 } from './types'

type Uniforms = {
  uPrimaryColor: Vec3
  uSecondaryColor: Vec3
  uDefaultPrimaryColor: Vec3
  uDefaultSecondaryColor: Vec3
  uIsDisable: boolean
}

const DEFAULT_PRIMARY_COLOR: Vec3 = [4, 0, 103]
const DEFAULT_SECONDARY_COLOR: Vec3 = [0, 59, 122]

const colorFragmentShader = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec3 uPrimaryColor;
uniform vec3 uSecondaryColor;
uniform vec3 uDefaultPrimaryColor;
uniform vec3 uDefaultSecondaryColor;
uniform bool uIsDisable;

bool isMatch(vec3 color1, vec3 color2, float threshold){
  if(abs(color1.r - color2.r) > threshold) return false;
  if(abs(color1.g - color2.g) > threshold) return false; 
  if(abs(color1.b - color2.b) > threshold) return false;
  return true;
}

void main(void) {
  vec4 textureColor = texture2D(uSampler, vTextureCoord);

  if(uIsDisable){
    gl_FragColor = vec4(vec3(textureColor.x + textureColor.y + textureColor.z) / 3.,textureColor.w);
    return;
  }

  if(textureColor.w == 0.){
    gl_FragColor = textureColor;
    return;
  }

  bool isPrimaryColor = isMatch(uDefaultPrimaryColor, textureColor.rgb * 256., 2.);
  if(isPrimaryColor){
    gl_FragColor = vec4(uPrimaryColor / 256., 1);
    return;
  }

  bool isSecondaryColor = isMatch(uDefaultSecondaryColor, textureColor.rgb * 256., 2.);
  if(isSecondaryColor){
    gl_FragColor = vec4(uSecondaryColor / 256., 1);
    return;
  }

  gl_FragColor = textureColor;
}
`

function getColorFilter(unifroms: Uniforms): PIXI.Filter {
  return new PIXI.Filter(undefined, colorFragmentShader, unifroms)
}

type Parameter = {
  parent: HTMLElement
  background?: string
  primaryColor?: Vec3
  secondaryColor?: Vec3
  isDisable?: boolean
}

class CharacterDisplayRenderer implements Renderer {
  private app: PIXI.Application<HTMLCanvasElement>
  private size: number
  private characterSprite: PIXI.Sprite
  private randomValue: number = Math.random()
  private parent: HTMLElement
  private shaderUniforms: Uniforms

  constructor({
    parent,
    background,
    primaryColor,
    secondaryColor,
    isDisable,
  }: Parameter) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"

    this.shaderUniforms = {
      uDefaultPrimaryColor: DEFAULT_PRIMARY_COLOR,
      uDefaultSecondaryColor: DEFAULT_SECONDARY_COLOR,
      uPrimaryColor: primaryColor ?? DEFAULT_PRIMARY_COLOR,
      uSecondaryColor: secondaryColor ?? DEFAULT_SECONDARY_COLOR,
      uIsDisable: isDisable ?? false,
    }
    this.parent = parent
    this.size = parent.getBoundingClientRect().width
    this.app = new PIXI.Application({ background: background ?? 'black' })

    this.app.view.width = this.size
    this.app.view.height = this.size

    this.characterSprite = new PIXI.Sprite(
      assets.wizard.spritesheet.textures['idleWizard']
    )
    this.characterSprite.filters = [getColorFilter(this.shaderUniforms)]
    const scale = (this.size * 0.7) / this.characterSprite.width
    this.characterSprite.scale.set(scale, scale)
    this.characterSprite.position.set(this.size / 2, this.size / 2)
    this.characterSprite.anchor.set(0.5, 0.55)

    this.app.stage.addChild(this.characterSprite)
  }

  set primaryColor(color: Vec3) {
    this.shaderUniforms.uPrimaryColor = color
  }

  get primaryColor(): Vec3 {
    return this.shaderUniforms.uPrimaryColor
  }

  set secondaryColor(color: Vec3) {
    this.shaderUniforms.uSecondaryColor = color
  }

  get secondaryColor(): Vec3 {
    return this.shaderUniforms.uSecondaryColor
  }

  set isDisable(disabled: boolean) {
    this.shaderUniforms.uIsDisable = disabled
  }

  get isDisable(): boolean {
    return this.shaderUniforms.uIsDisable
  }

  loop = () => {
    this.app.render()
    this.characterSprite.position.y =
      Math.sin(Date.now() / 500 + this.randomValue * 500) * this.size * 0.05 +
      this.size / 2
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
}

export default CharacterDisplayRenderer
