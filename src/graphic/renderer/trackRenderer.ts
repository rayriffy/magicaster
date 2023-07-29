import * as PIXI from 'pixi.js'
import { getAssets } from '../assets'
import { Renderer } from './types'

type Uniforms = {
  uFrame: number
}

type Params = {
  width: number
}

const trackFragmentShader = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float uFrame;

void main(void) {
  float uvX = mod((vTextureCoord.x + uFrame), 0.8);
  float uvY = vTextureCoord.y;
  vec4 textureColor = texture2D(uSampler, vec2(uvX, uvY));
  gl_FragColor = textureColor;
}
`

class TrackRenderer implements Renderer {
  private sprite: PIXI.Sprite
  private uniforms: Uniforms
  public speedPerRound: number = 1000
  private isRunning: boolean = false

  constructor({ width }: Params) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"

    const defaultTrackTexture =
      assets.track.spritesheet.textures['defaultTrack']
    const scale = width / defaultTrackTexture.width
    this.sprite = new PIXI.Sprite(defaultTrackTexture)
    this.sprite.scale = { x: scale, y: scale }

    this.uniforms = {
      uFrame: 0,
    }
    const filter = new PIXI.Filter(
      undefined,
      trackFragmentShader,
      this.uniforms
    )
    this.sprite.filters = [filter]
  }

  stop = () => {
    this.isRunning = false
  }

  start = () => {
    this.isRunning = true
  }

  setRound = (round: number) => {
    this.uniforms.uFrame = round % 0.8
  }

  loop(delta: number): void {
    if (!this.isRunning) return
    this.uniforms.uFrame =
      (this.uniforms.uFrame + delta / this.speedPerRound) % 0.8
  }

  getSprite = (): PIXI.Sprite => {
    return this.sprite
  }
}

export default TrackRenderer
