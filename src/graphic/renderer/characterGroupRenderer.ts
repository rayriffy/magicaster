import CharacterRenderer from './characterRenderer'
import { Area, CharacterColor, Renderer } from './types'

export type Params = {
  characterColors: { [id: string]: CharacterColor }
  area: Area
}

type CharacterRendererMap = {
  [id: string]: CharacterRenderer
}
class CharacterGroupRenderer implements Renderer {
  private characterRendererMap: CharacterRendererMap = {}
  private characterSize: number
  constructor({ characterColors, area }: Params) {
    const characterColorsEntries = Object.entries(characterColors)
    const trackOffsetSize = area.height * 0.08
    const trackSize =
      (area.height - trackOffsetSize * 2) /
      Object.values(characterColors).length
    this.characterSize = trackSize * 1.5

    for (let index = 0; index < characterColorsEntries.length; index++) {
      const [id, characterColor] = characterColorsEntries[index]
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
      this.characterRendererMap[id] = newCharacterRenderer
    }
  }

  getCharacterSize = (): number => {
    return this.characterSize
  }

  loop(delta: number): void {
    for (const characterRenderer of Object.values(this.characterRendererMap)) {
      characterRenderer.loop(delta)
    }
  }

  getCharacterRendererMap = (): CharacterRendererMap => {
    return this.characterRendererMap
  }

  allGoTo = (position: { x?: number; y?: number }) => {
    Object.values(this.characterRendererMap).forEach(renderer => {
      renderer.goTo(position)
    })
  }

  allAnimateTo = (position: { x?: number; y?: number }) => {
    Object.values(this.characterRendererMap).forEach(renderer => {
      renderer.animateTo(position)
    })
  }

  allAnimateToWithXPortions = (
    xPortions: { [id: string]: number },
    focusID: string,
    xTarget: number
  ) => {
    const startX = xTarget - xPortions[focusID]
    Object.entries(this.characterRendererMap).forEach(([id, renderer]) => {
      renderer.animateTo({ x: xPortions[id] + startX })
    })
  }
}

export default CharacterGroupRenderer
