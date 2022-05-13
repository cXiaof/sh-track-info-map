import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { useMemoizedFn } from 'ahooks'
import { Divider } from 'antd-mobile'
import React from 'react'

const Zoom = () => {
  const handleZoomIn = useMemoizedFn(() => {
    window.map.zoomIn()
  })

  const handleZoomOut = useMemoizedFn(() => {
    window.map.zoomOut()
  })

  return (
    <div className='h-20 w-10 text-2xl bg-white bg-opacity-[0.85] rounded-[1.25rem] pointer-events-auto flex flex-col justify-around items-center'>
      <PlusIcon className='h-6 mt-1' onClick={handleZoomIn} />
      <Divider className='w-full' style={{ margin: 'unset' }} />
      <MinusIcon className='h-6 mb-1' onClick={handleZoomOut} />
    </div>
  )
}

export default React.memo(Zoom)
