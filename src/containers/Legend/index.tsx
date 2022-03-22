import React from 'react'
import {
    LocationMarkerIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/solid'

const Legend = React.memo(() => {
    return (
        <div className='p-2 text-base bg-white rounded-lg pointer-events-auto'>
            <div
                className='flex items-center space-x-[2px]'
                style={{ color: '#696aad' }}
            >
                <LocationMarkerIcon className='h-5 -ml-[2px]' />
                <span>中风险地区</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#c2410c' }}
            >
                <ExclamationCircleIcon className='h-4' />
                <span>3天以内轨迹</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#f97316' }}
            >
                <ExclamationCircleIcon className='h-4' />
                <span>7天以内轨迹</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#fdba74' }}
            >
                <ExclamationCircleIcon className='h-4' />
                <span>14天以内轨迹</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#ffedd5' }}
            >
                <ExclamationCircleIcon className='h-4' />
                <span>14天以上轨迹</span>
            </div>
        </div>
    )
})

export default Legend
