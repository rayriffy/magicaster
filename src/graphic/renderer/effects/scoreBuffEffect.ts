import * as PIXI from 'pixi.js'
import { getAssets } from '../../assets'
import CharacterRenderer from '../characterRenderer'
import AnimateFrameEffect from './animateFrameEffect'

class ScoreBuffEffect extends AnimateFrameEffect {
  characterRenderer: CharacterRenderer
  constructor(characterRenderer: CharacterRenderer, duration: number) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"

    const animatedSprite = new PIXI.AnimatedSprite(
      Object.values(assets.effects.scoreBuffEffectSpritesheet.textures)
    )
    animatedSprite.animationSpeed = 0.1
    animatedSprite.loop = true
    animatedSprite.anchor.set(0.5, 0.55)

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

export default ScoreBuffEffect
