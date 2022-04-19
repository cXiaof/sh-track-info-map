import './projectConfig'
import * as styles from './styleConfig'

const map = new maptalks.Map('map', {
  center: [121.47362991, 31.23047407],
  zoom: 15,
  pitch: 15,
  scaleControl: {
    position: { bottom: '1', right: '28' },
    metric: true,
    imperial: false,
  },
  baseLayer: new maptalks.TileLayer('baseLayer', {
    subdomains: ['01', '02', '03', '04'],
    placeholder: true,
    maxAvailableZoom: 18,
    urlTemplate:
      'https://wprd{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
  }),
})

const layers = [
  new maptalks.PointLayer('track_tip_long', {
    style: { symbol: styles.trackTipLong },
    zIndex: 1,
    minZoom: 15.5,
  }),
  new maptalks.PointLayer('track_tip_m', {
    style: { symbol: styles.trackTipM },
    zIndex: 2,
    minZoom: 15.5,
  }),
  new maptalks.PointLayer('track_tip_14', {
    style: { symbol: styles.trackTip14 },
    zIndex: 3,
    minZoom: 15.5,
  }),
  new maptalks.PointLayer('track_tip_7', {
    style: { symbol: styles.trackTip7 },
    zIndex: 4,
    minZoom: 15.5,
  }),
  new maptalks.PointLayer('track_tip_3', {
    style: { symbol: styles.trackTip3 },
    zIndex: 5,
    minZoom: 15.5,
  }),
  new maptalks.PointLayer('track_icon_long', {
    style: { symbol: styles.trackIconLong },
    zIndex: 6,
  }),
  new maptalks.PointLayer('track_icon_m', {
    style: { symbol: styles.trackIconM },
    zIndex: 7,
  }),
  new maptalks.PointLayer('track_icon_14', {
    style: { symbol: styles.trackIcon14 },
    zIndex: 8,
  }),
  new maptalks.PointLayer('track_icon_7', {
    style: { symbol: styles.trackIcon7 },
    zIndex: 9,
  }),
  new maptalks.PointLayer('track_icon_3', {
    style: { symbol: styles.trackIcon3 },
    zIndex: 10,
  }),
  new maptalks.PointLayer('risk', {
    style: { symbol: styles.riskSymbol },
    zIndex: 99,
  }),
]

const groupLayer = new maptalks.GroupGLLayer('GroupGL', layers)
groupLayer.addTo(map)

map.on('click', (params: any) => {
  map.identify(
    {
      coordinate: params.coordinate,
      layers: groupLayer.getLayers(),
    },
    (geos: any[]) => {
      let data = geos.reduce((target, geo) => {
        if (geo.getLayer().getId().startsWith('track')) {
          target.push(geo.getProperties())
        }
        return target
      }, [])
      map.fire('record', { data })
    },
  )
})

window.map = map

export {}
