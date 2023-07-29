export interface Renderer {
  loop(delta: number): void
  getCanvas(): HTMLCanvasElement
}

export type Vec3 = [number, number, number]
