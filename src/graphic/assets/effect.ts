import * as PIXI from 'pixi.js'
import burnSlotEffectSpritePath from '../../assets/sprites/burn-slot-effect.png'
import reduceManaEffectSpritePath from '../../assets/sprites/reduce-mana-effect.png'
import reduceScoreEffectSpritePath from '../../assets/sprites/reduce-score-effect.png'
import reflectSpellEffectSpritePath from '../../assets/sprites/reflect-spell-effect.png'
import scoreBuffEffectSpritePath from '../../assets/sprites/score-buff-effect.png'
import shieldEffectSpritePath from '../../assets/sprites/shield-effect.png'

import burnSlotEffectManifestPath from '../../assets/sprites/burn-slot-effect.json'
import reduceManaEffectManifestPath from '../../assets/sprites/reduce-mana-effect.json'
import reduceScoreEffectManifestPath from '../../assets/sprites/reduce-score-effect.json'
import reflectSpellEffectManifestPath from '../../assets/sprites/reflect-spell-effect.json'
import scoreBuffEffectManifestPath from '../../assets/sprites/score-buff-effect.json'
import shieldEffectManifestPath from '../../assets/sprites/shield-effect.json'

export const bundle: PIXI.ResolverBundle = {
  name: 'effects',
  assets: {
    burnSlotEffect: burnSlotEffectSpritePath,
    reduceManaEffect: reduceManaEffectSpritePath,
    reduceScoreEffect: reduceScoreEffectSpritePath,
    reflectSpellEffect: reflectSpellEffectSpritePath,
    scoreBuffEffect: scoreBuffEffectSpritePath,
    shieldEffect: shieldEffectSpritePath,
  },
}

export const getSubSpritesheet = async (
  assetName: string,
  data: PIXI.ISpritesheetData
): Promise<PIXI.Spritesheet> => {
  const texture = PIXI.Assets.get(assetName) as PIXI.Texture
  if (typeof texture === 'undefined') throw 'track bundle not found'
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
  const spritesheet = new PIXI.Spritesheet(texture.baseTexture, data)
  await spritesheet.parse()
  return spritesheet
}

export type EffectSpritesheets = {
  burnSlotEffectSpritesheet: PIXI.Spritesheet
  reduceManaEffectSpritesheet: PIXI.Spritesheet
  reduceScoreEffectSpritesheet: PIXI.Spritesheet
  reflectSpellEffectSpritesheet: PIXI.Spritesheet
  scoreBuffEffectSpritesheet: PIXI.Spritesheet
  shieldEffectSpritesheet: PIXI.Spritesheet
}

export const getEffectSpritesheets = async (): Promise<EffectSpritesheets> => {
  const sheets = await Promise.all([
    getSubSpritesheet('burnSlotEffect', burnSlotEffectManifestPath),
    getSubSpritesheet('reduceManaEffect', reduceManaEffectManifestPath),
    getSubSpritesheet('reduceScoreEffect', reduceScoreEffectManifestPath),
    getSubSpritesheet('reflectSpellEffect', reflectSpellEffectManifestPath),
    getSubSpritesheet('scoreBuffEffect', scoreBuffEffectManifestPath),
    getSubSpritesheet('shieldEffect', shieldEffectManifestPath),
  ])

  return {
    burnSlotEffectSpritesheet: sheets[0],
    reduceManaEffectSpritesheet: sheets[1],
    reduceScoreEffectSpritesheet: sheets[2],
    reflectSpellEffectSpritesheet: sheets[3],
    scoreBuffEffectSpritesheet: sheets[4],
    shieldEffectSpritesheet: sheets[5],
  }
}
