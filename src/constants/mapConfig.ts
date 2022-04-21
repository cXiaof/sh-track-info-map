import * as itemsUtils from '@/utils/itemsUtils'
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
  new maptalks.GeoJSONVectorTileLayer('track_tip_long', {
    visible: false,
    zIndex: 1,
    minZoom: 15.5,
    style: styles.trackTipLong,
  }),
  new maptalks.GeoJSONVectorTileLayer('track_tip_m', {
    visible: false,
    zIndex: 2,
    minZoom: 15.5,
    style: styles.trackTipM,
  }),
  new maptalks.GeoJSONVectorTileLayer('track_tip_14', {
    visible: false,
    zIndex: 3,
    minZoom: 15.5,
    style: styles.trackTip14,
  }),
  new maptalks.GeoJSONVectorTileLayer('track_tip_7', {
    visible: false,
    zIndex: 4,
    minZoom: 15.5,
    style: styles.trackTip7,
  }),
  new maptalks.GeoJSONVectorTileLayer('track_tip_3', {
    visible: false,
    zIndex: 5,
    minZoom: 15.5,
    style: styles.trackTip3,
  }),
  new maptalks.PointLayer('track_icon_long', {
    visible: false,
    zIndex: 6,
    style: styles.trackIconLong,
  }),
  new maptalks.PointLayer('track_icon_m', {
    visible: false,
    zIndex: 7,
    style: styles.trackIconM,
  }),
  new maptalks.PointLayer('track_icon_14', {
    visible: false,
    zIndex: 8,
    style: styles.trackIcon14,
  }),
  new maptalks.PointLayer('track_icon_7', {
    visible: false,
    zIndex: 9,
    style: styles.trackIcon7,
  }),
  new maptalks.PointLayer('track_icon_3', {
    visible: false,
    zIndex: 10,
    style: styles.trackIcon3,
  }),
  new maptalks.PointLayer('risk', {
    style: { symbol: styles.riskSymbol },
    zIndex: 99,
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
      const address = geos.reduce((target, geo) => {
        if (geo instanceof maptalks.Marker) {
          if (geo.getLayer().getId().startsWith('track')) {
            target.push(geo.getProperties().published_address)
          }
        } else {
          target.push(geo.data.feature.properties.published_address)
        }
        return target
      }, [])
      map.fire('record', { data: itemsUtils.getArrNoRepeat(address) })
    },
  )
})

window.map = map

export {}
