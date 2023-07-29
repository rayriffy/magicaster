import * as PIXI from 'pixi.js'
import {
  bundle as wizardBundle,
  getSpritesheet as getWizardSpritesheet,
} from './wizard'
import {
  bundle as trackBundle,
  getSpritesheet as getTrackSpritesheet,
} from './track'

type Assets = {
  wizard: { spritesheet: PIXI.Spritesheet }
  track: { spritesheet: PIXI.Spritesheet }
}

let assets: Assets | null = null

export const load = async () => {
  let bundles: PIXI.ResolverBundle[] = [wizardBundle, trackBundle]

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

  assets = {
    wizard: { spritesheet: wizardSpritesheet },
    track: { spritesheet: trackSpritesheet },
  }
}

export const getAssets = (): Assets | null => {
  return assets
}
