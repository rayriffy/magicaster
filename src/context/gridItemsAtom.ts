import { map } from 'nanostores'

interface GridItems {
  alphabets: string[]
  selectedOrder: number[]
}

export const gridItemsAtom = map<GridItems>({
  alphabets: Array.from({ length: 16 }).map((_, i) =>
    String.fromCharCode(97 + i)
  ),
  selectedOrder: [],
})
