import * as PIXI from 'pixi.js'
import { IEffectRenderer } from './types'
import { Vec2 } from '../types'

type Params = {
  duration: number
  position: Vec2

  animatedSprite: PIXI.AnimatedSprite
}

abstract class AnimateFrameEffect implements IEffectRenderer {
  private duration: number
  public position: Vec2
  public animatedSprite: PIXI.AnimatedSprite
  private startTime: number | null = null
  constructor({ duration, position, animatedSprite }: Params) {
    this.duration = duration
    this.position = position
    this.animatedSprite = animatedSprite
  }

  getDisplayObject(): PIXI.DisplayObject {
    return this.animatedSprite
  }

  loop(_delta: number): boolean {
    if (this.startTime === null) {
      this.startTime = Date.now()
      this.animatedSprite.play()
    }

    this.animatedSprite.position.set(...this.position)

    if (Date.now() - this.startTime > this.duration) {
      this.animatedSprite.stop()
      this.animatedSprite.destroy()
      return true
    } else {
      return false
    }
  }
}

export default AnimateFrameEffect
