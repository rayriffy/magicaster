import * as PIXI from 'pixi.js'

export interface IEffectRenderer {
  getDisplayObject(): PIXI.DisplayObject
  loop(delta: number): boolean
}
