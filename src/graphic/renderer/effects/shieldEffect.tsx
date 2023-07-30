import { DisplayObject } from 'pixi.js'
import { getAssets } from '../../assets'
import { IEffectRenderer } from './types'
import { Vec2 } from '../types'

type Params = {
  duration: number
  position: Vec2
}

// class ShiledEffect implements IEffectRenderer {
//   private duration: number
//   private position: Vec2
//   constructor({ duration, position }: Params) {
//     const assets = getAssets()
//     if (assets === null) throw "assets aren't load yet"
//     this.duration = duration
//     this.position = position
//   }

//     getDisplayObject(): DisplayObject {}
//     loop(delta: number): boolean {}
// }
