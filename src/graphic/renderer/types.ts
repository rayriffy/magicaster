import * as PIXI from 'pixi.js'
export interface Renderer {
  loop(delta: number): void
}

export type Vec3 = [number, number, number]
export type Vec2 = [number, number]

export type CharacterColor = {
  primary: Vec3
  secondary: Vec3
}

export type Area = {
  width: number
  height: number
  startPoint: number
  endPoint: number
}

export interface DisplayObjectSpace<
  T extends PIXI.DisplayObject = PIXI.DisplayObject,
> {
  addChild<U extends T[]>(...children: U): U[0]
  removeChild<U extends T[]>(...children: U): U[0]
}
