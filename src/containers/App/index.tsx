import Legend from '@/containers/Legend'
import Location from '@/containers/Location'
import Record from '@/containers/Record'
import Zoom from '@/containers/Zoom'
import { useMemoizedFn, useMount } from 'ahooks'
import { Modal } from 'antd-mobile'
import React from 'react'
import Notice from './notice'

const App = () => {
  const animate2Location = useMemoizedFn(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords
        const coords = [longitude, latitude]
        const center = maptalks.CRSTransform.transform(coords, 'WGS84', 'GCJ02')
        window.map.animateTo({ center, zoom: 16 })
      },
      (error) => {
        console.error(error)
      },
      { enableHighAccuracy: true, timeout: 7000, maximumAge: 45000 },
    )
  })

  useMount(() => {
    Modal.clear()
    Modal.alert({
      content: <Notice />,
      onConfirm: animate2Location,
      afterShow: () => {
        requestAnimationFrame(() => {
          window.map.fire('loaddata')
        })
      },
    })
  })

  return (
    <div>
      <div className='absolute left-0 top-0 pl-5 pt-5 space-y-4'>
        <Record />
      </div>
      <div className='absolute left-0 bottom-0 pl-5 pb-10 space-y-4'>
        <Legend />
      </div>
      <div className='absolute text-primary right-0 bottom-0 pr-5 pb-10 space-y-4'>
        <Zoom />
        <Location animate2Location={animate2Location} />
      </div>
    </div>
  )
}

export default React.memo(App)
