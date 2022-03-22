import React from 'react'
import { Divider } from 'antd-mobile'
import { useMemoizedFn } from 'ahooks'
import { PlusIcon, MinusIcon } from '@heroicons/react/outline'

const Zoom = React.memo(() => {
    const handleZoomIn = useMemoizedFn(() => {
        window.map.zoomIn()
    })

    const handleZoomOut = useMemoizedFn(() => {
        window.map.zoomOut()
    })

    return (
        <div className='h-20 w-10 text-2xl bg-white rounded-[1.25rem] pointer-events-auto flex flex-col justify-around items-center'>
            <PlusIcon className='h-6 mt-1' onClick={handleZoomIn} />
            <Divider className='w-full' style={{ margin: 'unset' }} />
            <MinusIcon className='h-6 mb-1' onClick={handleZoomOut} />
        </div>
    )
})

export default Zoom
