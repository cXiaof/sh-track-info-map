import React from 'react'
import { useMount } from 'ahooks'
import { Modal } from 'antd-mobile'

import Notice from './notice'

const App = React.memo(() => {
    useMount(() => {
        Modal.clear()
        Modal.alert({
            content: <Notice />,
            onConfirm: animateToLocation,
        })
    })

    return <div>App</div>
})

const animateToLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { longitude, latitude } = position.coords
            window.map.animateTo({ center: [longitude, latitude] })
        },
        (error) => {
            console.error(error)
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 45000 }
    )
}

export default App
