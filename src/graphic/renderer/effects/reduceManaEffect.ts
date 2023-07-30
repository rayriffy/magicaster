import * as PIXI from 'pixi.js'
import { getAssets } from '../../assets'
import CharacterRenderer from '../characterRenderer'
import AnimateFrameEffect from './animateFrameEffect'

class ReduceManaSlotEffect extends AnimateFrameEffect {
  characterRenderer: CharacterRenderer
  constructor(characterRenderer: CharacterRenderer, duration: number) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"
    const textures = Object.values(
      assets.effects.reduceManaEffectSpritesheet.textures
    )
    const animatedSprite = new PIXI.AnimatedSprite(textures)
    const frameNumber = textures.length

    const targetFPS = frameNumber / (duration / 1000)
    animatedSprite.animationSpeed = targetFPS / 60
    animatedSprite.loop = false
    animatedSprite.anchor.set(0.6, 0.55)

    super({
      duration,
      position: characterRenderer.getSpritePosition(),
      animatedSprite: animatedSprite,
    })
    this.characterRenderer = characterRenderer
  }

  loop(delta: number): boolean {
    this.position = this.characterRenderer.getSpritePosition()
    return super.loop(delta)
  }
}

export default ReduceManaSlotEffect
