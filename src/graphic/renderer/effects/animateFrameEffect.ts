import * as PIXI from 'pixi.js'
import { getAssets } from '../../assets'
import { IEffectRenderer } from './types'
import { Vec2 } from '../types'

type Params = {
  duration: number
  position: Vec2

  animatedSprite: PIXI.AnimatedSprite
}

class animateFrameEffect implements IEffectRenderer {
  private duration: number
  private position: Vec2
  private animatedSprite: PIXI.AnimatedSprite
  constructor({ duration, position, animatedSprite }: Params) {
    this.duration = duration
    this.position = position
  }

  getDisplayObject(): PIXI.DisplayObject {

  }

  loop(delta: number): boolean {}
}

export default animateFrameEffect
