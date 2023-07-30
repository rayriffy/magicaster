import * as PIXI from 'pixi.js'
import { getAssets } from '../../assets'
import CharacterRenderer from '../characterRenderer'
import AnimateFrameEffect from './animateFrameEffect'

class ShieldEffect extends AnimateFrameEffect {
  characterRenderer: CharacterRenderer
  constructor(characterRenderer: CharacterRenderer, duration: number) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"

    const animatedSprite = new PIXI.AnimatedSprite(
      Object.values(assets.effects.shieldEffectSpritesheet.textures)
    )
    animatedSprite.animationSpeed = 0.1
    animatedSprite.loop = true
    animatedSprite.anchor.set(0.5, 0.5)
    animatedSprite.scale.set(0.6, 0.6)
    animatedSprite.alpha = 0.8

    super({
      duration,
      position: characterRenderer.getSpritePosition(),
      animatedSprite: animatedSprite,
    })

    this.characterRenderer = characterRenderer
    this.animatedSprite = animatedSprite
  }

  loop(delta: number): boolean {
    this.position = this.characterRenderer.getSpritePosition()
    this.animatedSprite.rotation = (1000 / (Date.now() % 1000)) * Math.PI
    return super.loop(delta)
  }
}

export default ShieldEffect
