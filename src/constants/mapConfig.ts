import './projectConfig'
import * as styles from './styleConfig'

const map = new maptalks.Map('map', {
  center: [121.47362991, 31.23047407],
  zoom: 15,
  pitch: 15,
  scaleControl: {
    position: { bottom: '1', right: '32' },
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
  new maptalks.PointLayer('track_long', {
    visible: false,
    zIndex: 1,
    style: { symbol: styles.trackLong },
  }),
  new maptalks.PointLayer('track_m', {
    visible: false,
    zIndex: 2,
    style: { symbol: styles.trackM },
  }),
  new maptalks.PointLayer('track_14', {
    visible: false,
    zIndex: 3,
    style: { symbol: styles.track14 },
  }),
  new maptalks.PointLayer('track_7', {
    visible: false,
    zIndex: 4,
    style: { symbol: styles.track7 },
  }),
  new maptalks.PointLayer('track_3', {
    visible: false,
    zIndex: 5,
    style: { symbol: styles.track3 },
  }),
  new maptalks.PointLayer('risk', {
    style: { symbol: styles.riskSymbol },
    zIndex: 9,
  }),
]

const options = { hitDetect: false }
const groupLayer = new maptalks.GroupGLLayer('GroupGL', layers, options)
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
