import * as styles from './styleConfig'

const map = new maptalks.Map('map', {
    center: [121.47362991, 31.23047407],
    zoom: 16,
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
    new maptalks.PointLayer('risk', {
        style: { symbol: styles.riskSymbol },
        zIndex: 9,
    }),
    new maptalks.PointLayer('track_long', {
        style: { symbol: styles.trackSymbolLong },
        zIndex: 1,
    }),
    new maptalks.PointLayer('track_m', {
        style: { symbol: styles.trackSymbolM },
        zIndex: 2,
    }),
    new maptalks.PointLayer('track_14', {
        style: { symbol: styles.trackSymbol14 },
        zIndex: 3,
    }),
    new maptalks.PointLayer('track_7', {
        style: { symbol: styles.trackSymbol7 },
        zIndex: 4,
    }),
    new maptalks.PointLayer('track_3', {
        style: { symbol: styles.trackSymbol3 },
        zIndex: 5,
    }),
]

const options = {
    hitDetect: false,
}
const groupLayer = new maptalks.GroupGLLayer('GroupGL', layers, options)
groupLayer.addTo(map)

window.map = map

export {}
