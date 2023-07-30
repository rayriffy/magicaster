import * as PIXI from 'pixi.js'
import {
  bundle as wizardBundle,
  getSpritesheet as getWizardSpritesheet,
} from './wizard'
import {
  bundle as trackBundle,
  getSpritesheet as getTrackSpritesheet,
} from './runningfield'
import {
  bundle as effectBundle,
  getEffectSpritesheets,
  EffectSpritesheets,
} from './effect'

type Assets = {
  wizard: { spritesheet: PIXI.Spritesheet }
  track: { spritesheet: PIXI.Spritesheet }
  effects: EffectSpritesheets
}

let assets: Assets | null = null

export const load = async () => {
  let bundles: PIXI.ResolverBundle[] = [wizardBundle, trackBundle, effectBundle]

  await PIXI.Assets.init({
    manifest: {
      bundles: bundles,
    },
  })

  for (const bundle of bundles) {
    await PIXI.Assets.loadBundle(bundle.name)
  }

  const wizardSpritesheet = await getWizardSpritesheet()
  const trackSpritesheet = await getTrackSpritesheet()
  const effectSpritesheets = await getEffectSpritesheets()

  assets = {
    wizard: { spritesheet: wizardSpritesheet },
    track: { spritesheet: trackSpritesheet },
    effects: effectSpritesheets,
  }
}

export const getAssets = (): Assets | null => {
  return assets
}
