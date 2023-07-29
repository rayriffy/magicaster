import { Vec3 } from '../../graphic/renderer/types'

type CharacterColor = {
  primary: Vec3
  secondary: Vec3
}

export const CHARACTER_COLOR_LIST: CharacterColor[] = [
  {
    primary: [4, 0, 103],
    secondary: [0, 59, 122],
  },
  {
    primary: [150, 39, 32],
    secondary: [235, 64, 52],
  },
  {
    primary: [252, 179, 68],
    secondary: [255, 212, 69],
  },
  {
    primary: [250, 157, 62],
    secondary: [255, 128, 0],
  },
  {
    primary: [66, 230, 48],
    secondary: [24, 173, 19],
  },
  {
    primary: [174, 34, 230],
    secondary: [111, 21, 230],
  },
  {
    primary: [252, 96, 242],
    secondary: [217, 117, 210],
  },
  {
    primary: [43, 217, 205],
    secondary: [33, 237, 176],
  },
]

export const CHARACTER_NUMBER = 8
