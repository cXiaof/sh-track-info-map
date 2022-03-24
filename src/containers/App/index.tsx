import React from 'react'
import { useMemoizedFn, useMount } from 'ahooks'
import { Modal } from 'antd-mobile'

import Notice from './notice'
import Legend from '@@/containers/Legend'
import Zoom from '@@/containers/Zoom'
import Location from '@@/containers/Location'

const App = React.memo(() => {
    const animate2Location = useMemoizedFn(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { longitude, latitude } = position.coords
                const center = [longitude, latitude]
                window.map.animateTo({ center, zoom: 16 })
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
    })

    return (
        <div>
            <div className='absolute left-0 bottom-0 pl-5 pb-11 space-y-4'>
                <Legend />
            </div>
            <div className='absolute text-primary right-0 bottom-0 pr-5 pb-11 space-y-4'>
                <Zoom />
                <Location animate2Location={animate2Location} />
            </div>
        </div>
    )
})

export default App
