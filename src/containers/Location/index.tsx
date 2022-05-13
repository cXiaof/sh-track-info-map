import { SupportIcon } from '@heroicons/react/outline'
import React from 'react'

export interface LocationProps {
  animate2Location: () => void
}

const Location: React.FC<LocationProps> = ({ animate2Location }) => {
  return (
    <div
      className='h-10 w-10 text-2xl bg-white bg-opacity-[0.85] rounded-full pointer-events-auto flex justify-center items-center'
      onClick={animate2Location}
    >
      <SupportIcon className='h-6' style={{ transform: 'rotate(45deg)' }} />
    </div>
  )
}

export default React.memo(Location)
