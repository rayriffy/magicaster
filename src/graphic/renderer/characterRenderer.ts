import * as PIXI from 'pixi.js'
import { getAssets } from '../assets'
import { Renderer, Vec3, Vec2 } from './types'
import Victor from 'victor'

type s = {
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
   sampler2D uSampler;
  
   vec3 uPrimaryColor;
   vec3 uSecondaryColor;
   vec3 uDefaultPrimaryColor;
   vec3 uDefaultSecondaryColor;
   bool uIsDisable;
  
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

function getColorFilter(unifroms: s): PIXI.Filter {
  return new PIXI.Filter(undefined, colorFragmentShader, unifroms)
}

type Params = {
  primaryColor?: Vec3
  secondaryColor?: Vec3
  isDisable?: boolean
  size: number
  originPosition: Vec2
}

class CharacterRenderer implements Renderer {
  private sprite: PIXI.Sprite
  public speedPerRound: number = 1000
  private randomValue: number = Math.random()
  private s: s
  private size: number
  private originPosition: Vec2 = [0, 0]
  private targetPosition: Vec2 = [0, 0]
  speed: number = 100

  constructor({ primaryColor, secondaryColor, isDisable, size }: Params) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"

    this.size = size

    this.s = {
      uDefaultPrimaryColor: DEFAULT_PRIMARY_COLOR,
      uDefaultSecondaryColor: DEFAULT_SECONDARY_COLOR,
      uPrimaryColor: primaryColor ?? DEFAULT_PRIMARY_COLOR,
      uSecondaryColor: secondaryColor ?? DEFAULT_SECONDARY_COLOR,
      uIsDisable: isDisable ?? false,
    }

    this.sprite = new PIXI.Sprite(
      assets.wizard.spritesheet.textures['idleWizard']
    )
    this.sprite.filters = [getColorFilter(this.s)]
    const scale = (this.size * 0.7) / this.sprite.width
    this.sprite.scale.set(scale, scale)
    this.sprite.anchor.set(0.5, 0.55)
    this.sprite.position.set(...this.originPosition)
  }

  loop = (delta: number) => {
    const distanceToNextPosition = delta / this.speed

    const originPositionVec = new Victor(...this.originPosition)
    const targetPositionVec = new Victor(...this.targetPosition)

    if (
      originPositionVec.distance(targetPositionVec) <= distanceToNextPosition
    ) {
      this.originPosition[0] = this.targetPosition[0]
      this.originPosition[1] = this.targetPosition[0]
    } else {
      const directionVec = targetPositionVec
        .subtract(originPositionVec)
        .normalize()
      this.originPosition[0] = directionVec.x * distanceToNextPosition
      this.originPosition[1] = directionVec.x * distanceToNextPosition
    }

    this.sprite.position.y =
      Math.sin(Date.now() / 500 + this.randomValue * 500) * this.size * 0.05 +
      this.originPosition[1]
    this.sprite.position.x = this.originPosition[0]
  }

  goTo = (x: number, y: number) => {
    this.originPosition[0] = x
    this.originPosition[1] = y
    this.targetPosition[0] = x
    this.targetPosition[1] = y
  }

  animateTo = (x: number, y: number) => {
    this.targetPosition[0] = x
    this.targetPosition[1] = y
  }

  getSprite = (): PIXI.Sprite => {
    return this.sprite
  }
}

export default CharacterRenderer
