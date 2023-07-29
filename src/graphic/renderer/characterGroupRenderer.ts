import CharacterRenderer from './characterRenderer'
import { Area, CharacterColor, Renderer } from './types'

export type Params = {
  characterColors: CharacterColor[]
  area: Area
}

class CharacterGroupRenderer implements Renderer {
  private characterRendererList: CharacterRenderer[] = []
  constructor({ characterColors, area }: Params) {
    const trackOffsetSize = area.height * 0.08
    const trackSize =
      (area.height - trackOffsetSize * 2) / characterColors.length

    for (let index = 0; index < characterColors.length; index++) {
      const characterColor = characterColors[index]
      const newCharacterRenderer = new CharacterRenderer({
        primaryColor: characterColor.primary,
        secondaryColor: characterColor.secondary,
        isDisable: false,
        size: trackSize * 1.5,
        originPosition: [
          area.startPoint,
          trackOffsetSize + (index + 1) * trackSize - trackSize / 2,
        ],
      })
      this.characterRendererList.push(newCharacterRenderer)
    }
  }

  loop(delta: number): void {
    for (const characterRenderer of this.characterRendererList) {
      characterRenderer.loop(delta)
    }
  }

  getCharacterRendererList = (): CharacterRenderer[] => {
    return this.characterRendererList
  }
}

export default CharacterGroupRenderer
