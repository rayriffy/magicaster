import * as PIXI from 'pixi.js'
import { getAssets } from '../assets'
import { CharacterColor, Renderer } from './types'
import TrackRenderer from './trackRenderer'
import CharacterGroupRenderer from './characterGroupRenderer'
import EffectQueueRenderer from './effectQueueRenderer'

export type PositioningMode = 'PREPARE' | 'RUNNING' | 'END'

type Params = {
  width: number
  characterColor: CharacterColor[]
  forcusedCharacterIndex: number
}

class GameDisplayRenderer implements Renderer {
  private app: PIXI.Application<HTMLCanvasElement>
  private width: number
  private height: number

  private trackRenderer: TrackRenderer
  private characterGroupRenderer: CharacterGroupRenderer
  private effectQueueRenderer: EffectQueueRenderer
  public characterScore: number[]
  public characterScoreDistanceRatio: number = 1
  private forcusedCharacterIndex: number

  constructor({ width, characterColor, forcusedCharacterIndex }: Params) {
    const assets = getAssets()
    if (assets === null) throw "assets aren't load yet"

    this.app = new PIXI.Application({ backgroundAlpha: 0 })
    this.width = width
    this.height = 0.6 * width
    this.forcusedCharacterIndex = forcusedCharacterIndex
    this.app.view.width = this.width
    this.app.view.height = this.height
    this.characterScore = Array(characterColor.length).fill(0)
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

    for (const characterRenderer of this.characterGroupRenderer.getCharacterRendererList()) {
      this.app.stage.addChild(characterRenderer.getSprite())
    }
  }

  animatePosition = (mode: PositioningMode) => {
    if (mode === 'PREPARE') {
      this.characterGroupRenderer.allAnimateTo({ x: this.width / 10 })
    }

    if (mode === 'RUNNING') {
      this.characterGroupRenderer.allAnimateToWithXPortions(
        this.characterScore.map(
          value => value * this.characterScoreDistanceRatio
        ),
        this.forcusedCharacterIndex,
        this.width / 2
      )
    }

    if (mode === 'END') {
      this.characterGroupRenderer.allAnimateTo({
        x: this.width + this.characterGroupRenderer.getCharacterSize() * 2,
      })
    }
  }

  getEffectQueueRenderer = (): EffectQueueRenderer => {
    return this.effectQueueRenderer
  }

  loop = (delta: number) => {
    this.trackRenderer.loop(delta)
    this.characterGroupRenderer.loop(delta)
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
