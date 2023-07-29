import * as PIXI from 'pixi.js'
import trackSpritePath from '../../assets/sprites/track.png'

export const bundle: PIXI.ResolverBundle = {
  name: 'track',
  assets: { track: trackSpritePath },
}

const trackSpritesheetData: PIXI.ISpritesheetData = {
  frames: {
    defaultTrack: {
      frame: { x: 0, y: 0, w: 100, h: 60 },
    },
  },
  meta: {
    scale: '1',
  },
  animations: {
    tracks: ['defaultTrack'],
  },
}

export const getSpritesheet = async (): Promise<PIXI.Spritesheet> => {
  const trackTexture = PIXI.Assets.get('track') as PIXI.Texture
  if (typeof trackTexture === 'undefined') throw 'track bundle not found'
  trackTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

  const trackSpritesheet = new PIXI.Spritesheet(
    trackTexture.baseTexture,
    trackSpritesheetData
  )
  await trackSpritesheet.parse()
  return trackSpritesheet
}
