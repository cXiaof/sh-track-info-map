import React from 'react'
import { SupportIcon } from '@heroicons/react/outline'

export interface LocationProps {
    animate2Location: () => void
}

const Location = React.memo(({ animate2Location }: LocationProps) => {
    return (
        <div
            className='h-10 w-10 text-2xl bg-white rounded-full pointer-events-auto flex justify-center items-center'
            onClick={animate2Location}
        >
            <SupportIcon
                className='h-6'
                style={{ transform: 'rotate(45deg)' }}
            />
        </div>
    )
})

export default Location
