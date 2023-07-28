import * as PIXI from 'pixi.js'
import { bundle as wizardBundle, getSpritesheet } from './wizard'

type Assets = {
  wizard: { spritesheet: PIXI.Spritesheet }
}

let assets: Assets | null = null

export const load = async () => {
  let bundles: PIXI.ResolverBundle[] = [wizardBundle]

  await PIXI.Assets.init({
    manifest: {
      bundles: bundles,
    },
  })

  for (const bundle of bundles) {
    await PIXI.Assets.loadBundle(bundle.name)
  }

  const wizardSpritesheet = await getSpritesheet()

  assets = {
    wizard: { spritesheet: wizardSpritesheet },
  }
}

export const getAssets = (): Assets | null => {
  return assets
}
