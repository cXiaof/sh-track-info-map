import React from 'react'
import { useMemoizedFn, useMount } from 'ahooks'
import { Modal } from 'antd-mobile'

import Notice from './notice'
import Zoom from '@@/containers/Zoom'
import Location from '@@/containers/Location'
import axios from 'axios'

const { map, maptalks } = window

const App = React.memo(() => {
    const animate2Location = useMemoizedFn(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { longitude, latitude } = position.coords
                map.animateTo({
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
        <div className='text-primary'>
            <div className='absolute right-0 bottom-0 pr-5 pb-11 space-y-4'>
                <Zoom />
                <Location animate2Location={animate2Location} />
            </div>
        </div>
    )
})

const renderRisk = async () => {
    const result = await axios.get('./data/risk.geojson')
    map.getLayer('risk').addGeometry(result.data)
}

const renderTrack = async () => {}

export default App
