import * as PIXI from 'pixi.js'
import { getAssets } from '../assets'
import { CharacterColor, Renderer } from './types'
import TrackRenderer from './trackRenderer'
import CharacterGroupRenderer from './characterGroupRenderer'
import EffectQueueRenderer from './effectQueueRenderer'

export type PositioningMode = 'PREPARE' | 'RUNNING' | 'END'

type Params = {
  width: number
  characterColor: { [id: string]: CharacterColor }
  forcusedCharacterID: string
}

class GameDisplayRenderer implements Renderer {
  private app: PIXI.Application<HTMLCanvasElement>
  private width: number
  private height: number

  private trackRenderer: TrackRenderer
  private characterGroupRenderer: CharacterGroupRenderer
  private effectQueueRenderer: EffectQueueRenderer
  public characterScore: { [id: string]: number }
  public characterScoreDistanceRatio: number = 3
  private forcusedCharacterID: string

  constructor({ width, characterColor, forcusedCharacterID }: Params) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"

    this.app = new PIXI.Application({ backgroundAlpha: 0 })

    this.width = width
    this.height = 0.6 * width
    this.forcusedCharacterID = forcusedCharacterID
    this.app.view.width = this.width
    this.app.view.height = this.height
    this.characterScore = Object.fromEntries(
      Object.entries(characterColor).map(([id]) => [id, 0])
    )
    this.effectQueueRenderer = new EffectQueueRenderer(this.app.stage)

    // set up track
    this.trackRenderer = new TrackRenderer({ width })
    this.trackRenderer.getSprite().position = { x: 0, y: 0 }
    this.app.stage.addChild(this.trackRenderer.getSprite())
    this.trackRenderer.start()

    // set up character group
    this.characterGroupRenderer = new CharacterGroupRenderer({
      characterColors: characterColor,
      area: {
        width: this.width,
        height: this.height,
        startPoint: this.width / 10,
        endPoint: this.width - this.width / 20,
      },
    })

    for (const characterRenderer of Object.values(
      this.characterGroupRenderer.getCharacterRendererMap()
    )) {
      this.app.stage.addChild(characterRenderer.getSprite())
    }
  }

  animatePosition = (mode: PositioningMode) => {
    if (mode === 'PREPARE') {
      this.characterGroupRenderer.allAnimateTo({ x: this.width / 10 })
    }

    if (mode === 'RUNNING') {
      const distanceMap = Object.fromEntries(
        Object.entries(this.characterScore).map(([id, score]) => [
          id,
          score * this.characterScoreDistanceRatio,
        ])
      )
      this.characterGroupRenderer.allAnimateToWithXPortions(
        distanceMap,
        this.forcusedCharacterID,
        this.width / 2
      )
    }

    if (mode === 'END') {
      this.characterGroupRenderer.allAnimateTo({
        x: this.width + this.characterGroupRenderer.getCharacterSize() * 2,
      })
    }
  }

  getCharacterGroupRenderer = (): CharacterGroupRenderer => {
    return this.characterGroupRenderer
  }

  getEffectQueueRenderer = (): EffectQueueRenderer => {
    return this.effectQueueRenderer
  }

  loop = (delta: number) => {
    this.trackRenderer.loop(delta)
    this.characterGroupRenderer.loop(delta)
    this.effectQueueRenderer.loop(delta)
    this.app.render()
  }

  getCanvas = () => {
    return this.app.view
  }

  destroy = () => {
    this.app.destroy()
  }
}

export default GameDisplayRenderer
