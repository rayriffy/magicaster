import * as PIXI from 'pixi.js'
import wizardSpritePath from '../../assets/sprites/wizard.png'

export const bundle: PIXI.ResolverBundle = {
  name: 'wizard',
  assets: { wizard: wizardSpritePath },
}

const wizardSpritesheetData: PIXI.ISpritesheetData = {
  frames: {
    idleWizard: {
      frame: { x: 0, y: 0, w: 64, h: 64 },
    },
    castWizard: {
      frame: { x: 64, y: 0, w: 64, h: 64 },
    },
    downWizard: {
      frame: { x: 0, y: 64, w: 64, h: 64 },
    },
  },
  meta: {
    scale: '1',
  },
  animations: {
    state: ['idleWizard', 'castWizard', 'downWizard'],
  },
}

export const getSpritesheet = async (): Promise<PIXI.Spritesheet> => {
  const wizardTexture = PIXI.Assets.get('wizard') as PIXI.Texture
  if (typeof wizardTexture === 'undefined') throw 'wizard bundle not found'
  const wizardSpritesheet = new PIXI.Spritesheet(
    wizardTexture.baseTexture,
    wizardSpritesheetData
  )
  await wizardSpritesheet.parse()
  return wizardSpritesheet
}
