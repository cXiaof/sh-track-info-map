import React from 'react'
import { Divider } from 'antd-mobile'
import { AddOutline, MinusOutline } from 'antd-mobile-icons'
import { useMemoizedFn } from 'ahooks'

const { map } = window

const Zoom = React.memo(() => {
    const handleZoomIn = useMemoizedFn(() => {
        map.zoomIn()
    })

    const handleZoomOut = useMemoizedFn(() => {
        map.zoomOut()
    })

    return (
        <div className='h-20 w-10 text-2xl bg-white rounded-[1.25rem] pointer-events-auto flex flex-col justify-around items-center'>
            <AddOutline className='mt-1' onClick={handleZoomIn} />
            <Divider className='w-full' style={{ margin: 'unset' }} />
            <MinusOutline className='mb-1' onClick={handleZoomOut} />
        </div>
    )
})

export default Zoom
