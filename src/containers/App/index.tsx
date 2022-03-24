import React from 'react'
import { useBoolean, useMemoizedFn, useMount } from 'ahooks'
import { Modal } from 'antd-mobile'
import axios from 'axios'
import dayjs from 'dayjs'

import Notice from './notice'
import Legend from '@@/containers/Legend'
import Zoom from '@@/containers/Zoom'
import Location from '@@/containers/Location'

const time = dayjs().valueOf()

const App = React.memo(() => {
    const [riskOver, riskOverActions] = useBoolean(false)
    const [trackOver, trackOverActions] = useBoolean(false)

    const animate2Location = useMemoizedFn(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { longitude, latitude } = position.coords
                window.map.animateTo({
                    center: [longitude, latitude],
                    zoom: 16,
                })
            },
            (error) => {
                console.error(error)
            },
            { enableHighAccuracy: true, timeout: 7000, maximumAge: 45000 }
        )
    })

    const renderRisk = useMemoizedFn(async () => {
        const result = await axios.get(`./data/risk.geojson?_t=${time}`)
        window.map.getLayer('risk').addGeometry(result.data)
        riskOverActions.setTrue()
    })

    const renderTrack = useMemoizedFn(async () => {
        const result = await axios.get(`./data/track.geojson?_t=${time}`)
        Object.values(result.data).forEach((track) =>
            window.map.getLayer('track').addGeometry(track)
        )
        trackOverActions.setTrue()
    })

    useMount(() => {
        Modal.clear()
        Modal.alert({
            content: <Notice />,
            onConfirm: animate2Location,
        })
        renderRisk()
        renderTrack()
    })

    return (
        <div>
            <div className='absolute left-0 bottom-0 pl-5 pb-11 space-y-4'>
                <Legend riskOver={riskOver} trackOver={trackOver} />
            </div>
            <div className='absolute text-primary right-0 bottom-0 pr-5 pb-11 space-y-4'>
                <Zoom />
                <Location animate2Location={animate2Location} />
            </div>
        </div>
    )
})

export default App
