import CharacterRenderer from './characterRenderer'
import { Area, CharacterColor, Renderer } from './types'

export type Params = {
  characterColors: CharacterColor[]
  area: Area
}

class CharacterGroupRenderer implements Renderer {
  private characterRendererList: CharacterRenderer[] = []
  private characterSize: number
  constructor({ characterColors, area }: Params) {
    const trackOffsetSize = area.height * 0.08
    const trackSize =
      (area.height - trackOffsetSize * 2) / characterColors.length
    this.characterSize = trackSize * 1.5

    for (let index = 0; index < characterColors.length; index++) {
      const characterColor = characterColors[index]
      const newCharacterRenderer = new CharacterRenderer({
        primaryColor: characterColor.primary,
        secondaryColor: characterColor.secondary,
        isDisable: false,
        size: this.characterSize,
        originPosition: [
          area.startPoint,
          trackOffsetSize + (index + 1) * trackSize - trackSize / 2,
        ],
      })
      this.characterRendererList.push(newCharacterRenderer)
    }
  }

  getCharacterSize = (): number => {
    return this.characterSize
  }

  loop(delta: number): void {
    for (const characterRenderer of this.characterRendererList) {
      characterRenderer.loop(delta)
    }
  }

  getCharacterRendererList = (): CharacterRenderer[] => {
    return this.characterRendererList
  }

  allGoTo = (position: { x?: number; y?: number }) => {
    this.characterRendererList.forEach(renderer => {
      renderer.goTo(position)
    })
  }

  allAnimateTo = (position: { x?: number; y?: number }) => {
    this.characterRendererList.forEach(renderer => {
      renderer.animateTo(position)
    })
  }

  allAnimateToWithXPortions = (
    xPortions: number[],
    focusIndex: number,
    xTarget: number
  ) => {
    const startX = xTarget - xPortions[focusIndex]
    this.characterRendererList.forEach((renderer, index) => {
      renderer.animateTo({ x: xPortions[index] + startX })
    })
  }
}

export default CharacterGroupRenderer
