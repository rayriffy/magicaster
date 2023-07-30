import { FunctionComponent, useCallback } from 'react'
import { useStore } from '@nanostores/react'

import { gridItemsAtom } from '../context/gridItemsAtom'

export const PlayerAlphabetGrid: FunctionComponent = () => {
  const gridItems = useStore(gridItemsAtom)

  // click to add alphabet index to chunk
  const onRootClick = useCallback((e: any) => {
    if (e.target.id.startsWith('button-alphabet-')) {
      gridItemsAtom.setKey('selectedOrder', [
        ...gridItems.selectedOrder,
        Number(e.target.id.replace('button-alphabet-', '')),
      ])
    }
  }, [gridItems])

  return (
    <div
      id="player-grid"
      className="grid aspect-square w-full shrink-0 grid-cols-4 items-center justify-center gap-4 px-8 font-bold"
      onClick={onRootClick}
    >
      {gridItems.alphabets.map((item, i) => (
        <button key={`alphabet-${i}-${item}`} id={`button-alphabet-${i}`}>
          {item}
        </button>
      ))}
    </div>
  )
}
