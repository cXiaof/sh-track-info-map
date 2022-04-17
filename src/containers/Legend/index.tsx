import React, { useMemo } from 'react'
import {
    LocationMarkerIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/solid'
import { useBoolean, useMemoizedFn, useMount } from 'ahooks'
import { DotLoading } from 'antd-mobile'

const time = new Date().getTime()

const Legend = React.memo(() => {
    const [riskOver, riskOverActions] = useBoolean(false)
    const [track3, track3Actions] = useBoolean(false)
    const [track7, track7Actions] = useBoolean(false)
    const [track14, track14Actions] = useBoolean(false)
    const [trackM, trackMActions] = useBoolean(false)
    const [trackLong, trackLongActions] = useBoolean(false)

    const groupLayer = useMemo(() => window.map.getLayer('GroupGL'), [])

    const renderRisk = useMemoizedFn(async () => {
        const result = await fetch(`./data/risk.geojson?_t=${time}`)
        const features = await result.json()
        groupLayer.getLayer('risk').addGeometry(features)
        riskOverActions.setTrue()
    })

    const renderTrackLong = useMemoizedFn(async () => {
        const result = await fetch(`./data/track_long.geojson?_t=${time}`)
        const features = await result.json()
        Object.values(features).forEach((track) => {
            groupLayer.getLayer('track_tip_long').addGeometry(track)
            groupLayer.getLayer('track_icon_long').addGeometry(track)
        })
        trackLongActions.setTrue()
    })

    const renderTrackM = useMemoizedFn(async () => {
        const result = await fetch(`./data/track_m.geojson?_t=${time}`)
        const features = await result.json()
        Object.values(features).forEach((track) => {
            groupLayer.getLayer('track_tip_m').addGeometry(track)
            groupLayer.getLayer('track_icon_m').addGeometry(track)
        })
        trackMActions.setTrue()
    })

    const renderTrack14 = useMemoizedFn(async () => {
        const result = await fetch(`./data/track_14.geojson?_t=${time}`)
        const features = await result.json()
        Object.values(features).forEach((track) => {
            groupLayer.getLayer('track_tip_14').addGeometry(track)
            groupLayer.getLayer('track_icon_14').addGeometry(track)
        })
        track14Actions.setTrue()
    })

    const renderTrack7 = useMemoizedFn(async () => {
        const result = await fetch(`./data/track_7.geojson?_t=${time}`)
        const features = await result.json()
        Object.values(features).forEach((track) => {
            groupLayer.getLayer('track_tip_7').addGeometry(track)
            groupLayer.getLayer('track_icon_7').addGeometry(track)
        })
        track7Actions.setTrue()
    })

    const renderTrack3 = useMemoizedFn(async () => {
        const result = await fetch(`./data/track_3.geojson?_t=${time}`)
        const features = await result.json()
        Object.values(features).forEach((track) => {
            groupLayer.getLayer('track_tip_3').addGeometry(track)
            groupLayer.getLayer('track_icon_3').addGeometry(track)
        })
        track3Actions.setTrue()
    })

    useMount(() => {
        window.map.once('loaddata', () => {
            renderRisk()
            renderTrack3()
            renderTrack7()
            renderTrack14()
            renderTrackM()
            renderTrackLong()
        })
    })

    return (
        <div className='p-2 text-base bg-white bg-opacity-[0.85] rounded-lg pointer-events-auto'>
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
                style={{ color: '#7c2d12' }}
            >
                {track3 ? (
                    <ExclamationCircleIcon className='h-4' />
                ) : (
                    <DotLoading color='currentColor' />
                )}
                <span>{`发布<3天`}</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#c2410c' }}
            >
                {track7 ? (
                    <ExclamationCircleIcon className='h-4' />
                ) : (
                    <DotLoading color='currentColor' />
                )}
                <span>{`发布<7天`}</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#f97316' }}
            >
                {track14 ? (
                    <ExclamationCircleIcon className='h-4' />
                ) : (
                    <DotLoading color='currentColor' />
                )}
                <span>{`发布<14天`}</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#fdba74' }}
            >
                {trackM ? (
                    <ExclamationCircleIcon className='h-4' />
                ) : (
                    <DotLoading color='currentColor' />
                )}
                <span>{`发布<1个月`}</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#ffedd5' }}
            >
                {trackLong ? (
                    <ExclamationCircleIcon className='h-4' />
                ) : (
                    <DotLoading color='currentColor' />
                )}
                <span>{`发布≥1个月`}</span>
            </div>
        </div>
    )
})

export default Legend
