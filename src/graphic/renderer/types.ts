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
