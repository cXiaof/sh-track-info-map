import React from 'react'
import {
    LocationMarkerIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/solid'
import { useBoolean, useMemoizedFn, useMount } from 'ahooks'
import { DotLoading } from 'antd-mobile'
import dayjs from 'dayjs'
import axios from 'axios'

const time = dayjs().valueOf()

const Legend = React.memo(() => {
    const [riskOver, riskOverActions] = useBoolean(false)
    const [track3, track3Actions] = useBoolean(false)
    const [track7, track7Actions] = useBoolean(false)
    const [track14, track14Actions] = useBoolean(false)
    const [trackLong, trackLongActions] = useBoolean(false)

    const renderRisk = useMemoizedFn(async () => {
        const result = await axios.get(`./data/risk.geojson?_t=${time}`)
        window.map.getLayer('risk').addGeometry(result.data)
        riskOverActions.setTrue()
    })

    const renderTrack3 = useMemoizedFn(async () => {
        const result = await axios.get(`./data/track_3.geojson?_t=${time}`)
        Object.values(result.data).forEach((track) =>
            window.map.getLayer('track_long').addGeometry(track)
        )
        track3Actions.setTrue()
    })

    const renderTrack7 = useMemoizedFn(async () => {
        const result = await axios.get(`./data/track_7.geojson?_t=${time}`)
        Object.values(result.data).forEach((track) =>
            window.map.getLayer('track_14').addGeometry(track)
        )
        track7Actions.setTrue()
    })

    const renderTrack14 = useMemoizedFn(async () => {
        const result = await axios.get(`./data/track_14.geojson?_t=${time}`)
        Object.values(result.data).forEach((track) =>
            window.map.getLayer('track_7').addGeometry(track)
        )
        track14Actions.setTrue()
    })

    const renderTrackLong = useMemoizedFn(async () => {
        const result = await axios.get(`./data/track_long.geojson?_t=${time}`)
        Object.values(result.data).forEach((track) =>
            window.map.getLayer('track_3').addGeometry(track)
        )
        trackLongActions.setTrue()
    })

    useMount(() => {
        renderRisk()
        renderTrack3()
        renderTrack7()
        renderTrack14()
        renderTrackLong()
    })

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
                {track3 ? (
                    <ExclamationCircleIcon className='h-4' />
                ) : (
                    <DotLoading color='currentColor' />
                )}
                <span>{`发布<3天`}</span>
            </div>
            <div
                className='flex items-center space-x-1'
                style={{ color: '#f97316' }}
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
                style={{ color: '#fdba74' }}
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
                style={{ color: '#ffedd5' }}
            >
                {trackLong ? (
                    <ExclamationCircleIcon className='h-4' />
                ) : (
                    <DotLoading color='currentColor' />
                )}
                <span>{`发布≥14天`}</span>
            </div>
        </div>
    )
})

export default Legend
