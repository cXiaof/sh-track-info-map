import { getArrNoRepeat } from '@/utils/itemsUtils'
import { useMount } from 'ahooks'
import React, { useState } from 'react'

interface RecordMap {
  [address: string]: number[]
}

const Record = React.memo(() => {
  const [records, setRecords] = useState<RecordMap>({})

  useMount(() => {
    window.map.on('record', (params: any) => {
      const datamap = params.data.reduce((target: any, address: string) => {
        target[address] = getAddrDates(address)
        return target
      }, {})
      setRecords(datamap)
    })
  })

  if (Object.keys(records).length === 0) {
    return (
      <div className='p-2 text-base bg-white bg-opacity-[0.85] rounded-lg pointer-events-auto space-y-1 text-neutral-500'>
        <div>点击地图上的点查看</div>
        <div>其地址上的通报历史</div>
      </div>
    )
  }

  return (
    <div className='p-2 text-base bg-white bg-opacity-[0.85] rounded-lg pointer-events-auto divide-y'>
      {Object.entries(records).map(([address, dates]) => (
        <div
          key={address}
          className='py-1 border-0 border-solid border-neutral-500'
        >
          <div className='font-semibold'>{address}</div>
          {getArrNoRepeat(dates).map((datenum) => {
            const date = new Date(datenum)
            return (
              <div key={datenum}>
                <span className='font-semibold pl-px pr-2'>-</span>
                <span>{fmtDate(date.getMonth() + 1)}</span>
                <span>月</span>
                <span>{fmtDate(date.getDate())}</span>
                <span>日</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
})

const getAddrDates = (address: string) => {
  const geos = filterGeos(address)
  const dates = geos.map((geo) => geo.getProperties().date)
  return dates.sort((val1, val2) => {
    if (val1 === val2) return 0
    return val1 < val2 ? 1 : -1
  })
}

const filterGeos = (address: string) => {
  const groupLayer = window.map.getLayer('GroupGL')
  const layernames = [
    'track_icon_long',
    'track_icon_m',
    'track_icon_14',
    'track_icon_7',
    'track_icon_3',
  ]
  return layernames.reduce<any[]>((target, layername: string) => {
    const layer = groupLayer.getLayer(layername)
    const result = layer.filter(['==', 'published_address', address])
    return [...target, ...result]
  }, [])
}

const fmtDate = (num: number) => num.toString().padStart(2, '0')

export default Record
