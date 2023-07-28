import * as PIXI from 'pixi.js'

export interface Renderer {
  loop(delta: number): void
  getCanvas(): PIXI.ICanvas
}
