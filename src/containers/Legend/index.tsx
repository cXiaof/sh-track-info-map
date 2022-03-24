import React, { useMemo } from 'react'
import { DotLoading } from 'antd-mobile'
import {
    LocationMarkerIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/solid'

export interface LegendProps {
    riskOver: boolean
    trackOver: boolean
}

const Legend = React.memo(({ riskOver, trackOver }: LegendProps) => {
    const trackIcon = useMemo(
        () =>
            trackOver ? (
                <ExclamationCircleIcon className='h-4' />
            ) : (
                <DotLoading color='currentColor' />
            ),
        [trackOver]
    )

    return (
        <div className='p-2 text-base bg-white rounded-lg pointer-events-auto'>
            <div
                className='flex items-center space-x-[2px]'
                style={{ color: '#696aad' }}
            >
                {riskOver ? (
                    <LocationMarkerIcon className='h-5 -ml-[2px]' />
                ) : (
                    <DotLoading color='currentColor' />
                )}
                <span>中风险地区</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#c2410c' }}
            >
                {trackIcon}
                <span>{`发布<3天`}</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#f97316' }}
            >
                {trackIcon}
                <span>{`发布<7天`}</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#fdba74' }}
            >
                {trackIcon}
                <span>{`发布<14天`}</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#ffedd5' }}
            >
                {trackIcon}
                <span>{`发布≥14天`}</span>
            </div>
        </div>
    )
})

export default Legend
