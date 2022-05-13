import * as services from '@/services'
import { LocationMarkerIcon } from '@heroicons/react/solid'
import { useBoolean, useMemoizedFn, useMount } from 'ahooks'
import React from 'react'
import LegendItem from './LegendItem'
import LoadAll from './LoadAll'

const Legend = () => {
  const [riskOver, riskOverActions] = useBoolean(false)
  const [loadAll, loadAllActions] = useBoolean(false)
  const [track3, track3Actions] = useBoolean(false)
  const [track7, track7Actions] = useBoolean(false)
  const [track14, track14Actions] = useBoolean(false)
  const [trackM, trackMActions] = useBoolean(false)
  const [trackLong, trackLongActions] = useBoolean(false)

  const renderRisk = useMemoizedFn(async () => {
    const features = await services.getRisk()
    const groupLayer = window.map.getLayer('GroupGL')
    groupLayer.getLayer('risk').addGeometry(features)
    riskOverActions.setTrue()
  })

  const renderTrackLong = useMemoizedFn(async () => {
    const features = await services.getTrackLong()
    const featuresApril = await services.getTrackApril()
    const featuresMarch = await services.getTrackMarch()
    const featuresLong = {
      ...features,
      ...featuresApril,
      ...featuresMarch,
    }
    renderGeometry(featuresLong, 'long')
    trackLongActions.setTrue()
  })

  const renderTrackM = useMemoizedFn(async () => {
    const features = await services.getTrackM()
    renderGeometry(features, 'm')
    trackMActions.setTrue()
  })

  const renderTrack14 = useMemoizedFn(async () => {
    const features = await services.getTrack14()
    renderGeometry(features, '14')
    track14Actions.setTrue()
  })

  const renderTrack7 = useMemoizedFn(async () => {
    const features = await services.getTrack7()
    renderGeometry(features, '7')
    track7Actions.setTrue()
  })

  const renderTrack3 = useMemoizedFn(async () => {
    const features = await services.getTrack3()
    renderGeometry(features, '3')
    track3Actions.setTrue()
  })

  const handleLoadAll = useMemoizedFn(() => {
    loadAllActions.setTrue()
    renderTrackLong()
  })

  useMount(() => {
    window.map.once('loaddata', () => {
      renderRisk()
      renderTrack3()
      renderTrack7()
      renderTrack14()
      renderTrackM()
      handleLoadAll()
    })
  })

  return (
    <div className='p-2 text-base bg-white bg-opacity-[0.85] rounded-lg pointer-events-auto'>
      <LegendItem
        loading={!riskOver}
        theme='#696aad'
        icon={<LocationMarkerIcon className='h-5 -ml-[2px]' />}
        title='中风险地区'
      />
      <LegendItem loading={!track3} theme='#7c2d12' title='发布<3天' />
      <LegendItem loading={!track7} theme='#c2410c' title='发布<7天' />
      <LegendItem loading={!track14} theme='#f97316' title='发布<14天' />
      <LegendItem loading={!trackM} theme='#fdba74' title='发布<1个月' />
      {loadAll ? (
        <LegendItem loading={!trackLong} theme='#ffedd5' title='发布≥1个月' />
      ) : (
        <LoadAll loadAll={handleLoadAll} />
      )}
    </div>
  )
}

const renderGeometry = (data: any, type: string) => {
  const groupLayer = window.map.getLayer('GroupGL')
  const tipLayer = groupLayer.getLayer(`track_tip_${type}`)
  const iconLayer = groupLayer.getLayer(`track_icon_${type}`)

  const collection = Object.values(data).reduce((target: any, item: any) => {
    target.features = [...target.features, ...item.features]
    return target
  }, tipLayer.getData())

  tipLayer.setData(collection)
  iconLayer.addGeometry(collection)
}

export default React.memo(Legend)
