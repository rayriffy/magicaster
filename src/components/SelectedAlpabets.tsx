import { useStore } from '@nanostores/react'

import { gridItemsAtom } from '../context/gridItemsAtom'
import { useCallback } from 'react'

export const SelectedAlpabets = () => {
  const gridItems = useStore(gridItemsAtom)

  const onRootClick = useCallback(
    (e: any) => {
      if (e.target.id.startsWith('eject-')) {
        const orders = gridItemsAtom.get().selectedOrder
        orders.splice(Number(e.target.id.replace('eject-', '')), 1)
        gridItemsAtom.setKey('selectedOrder', orders)
      }
    },
    [gridItems]
  )

  return (
    <div className="flex space-x-4" onClick={onRootClick}>
      {gridItems.selectedOrder.map((item, i) => (
        <button id={`eject-${i}`} key={`active-alphabets-${i}-${item}`}>
          {gridItems.alphabets[item]}
        </button>
      ))}
    </div>
  )
}
