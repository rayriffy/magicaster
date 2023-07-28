export interface Renderer {
  loop(delta: number): void
  getCanvas(): HTMLCanvasElement
}
