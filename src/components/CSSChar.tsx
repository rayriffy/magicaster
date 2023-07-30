import { Witch } from './Witch'

export const CSSChar = () => {
  return (
    <div className="aspect-square w-full rounded-xl bg-white flex items-center justify-center">
      <div className="animate-bounce">
        <Witch className="transform scale-[400%]" />
      </div>
    </div>
  )
}
