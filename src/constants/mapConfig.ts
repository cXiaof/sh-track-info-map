import { riskStyle, trackStyle } from './styleConfig'

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
        new window.maptalks.VectorLayer('track', { style: trackStyle }),
        new window.maptalks.VectorLayer('risk', { style: riskStyle }),
    ],
})

export {}
