import * as styles from './styleConfig'

window.map = new window.maptalks.Map('map', {
    center: [121.47362991, 31.23047407],
    zoom: 16,
    pitch: 15,
    scaleControl: {
        position: { bottom: '1', right: '28' },
        metric: true,
        imperial: false,
    },
    baseLayer: new window.maptalks.TileLayer('baseLayer', {
        subdomains: ['01', '02', '03', '04'],
        placeholder: true,
        maxAvailableZoom: 18,
        urlTemplate:
            'https://wprd{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
    }),
    layers: [
        new window.maptalks.VectorLayer('risk', {
            style: { symbol: styles.riskSymbol },
            zIndex: 5,
        }),
        new window.maptalks.VectorLayer('track_long', {
            style: { symbol: styles.trackSymbolLong },
            zIndex: 1,
        }),
        new window.maptalks.VectorLayer('track_14', {
            style: { symbol: styles.trackSymbol14 },
            zIndex: 2,
        }),
        new window.maptalks.VectorLayer('track_7', {
            style: { symbol: styles.trackSymbol7 },
            zIndex: 3,
        }),
        new window.maptalks.VectorLayer('track_3', {
            style: { symbol: styles.trackSymbol3 },
            zIndex: 4,
        }),
    ],
})

export {}
