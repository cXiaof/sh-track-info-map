const { maptalks } = window

const riskStyle = {
    symbol: [
        {
            markerType: 'path',
            markerPathWidth: 16,
            markerPathHeight: 23,
            markerWidth: {
                stops: [
                    [10, window.getTextSize(16)],
                    [22, window.getTextSize(32)],
                ],
            },
            markerHeight: {
                stops: [
                    [10, window.getTextSize(23)],
                    [22, window.getTextSize(46)],
                ],
            },
            markerPath: [
                {
                    path: 'M8 23l0 0 0 0 0 0 0 0 0 0c-4,-5 -8,-10 -8,-14 0,-5 4,-9 8,-9l0 0 0 0c4,0 8,4 8,9 0,4 -4,9 -8,14z M3,9 a5,5 0,1,0,0,-0.9Z',
                    fill: 'orange',
                },
            ],
        },
        {
            textName: '中风险地区',
            textFill: 'orange',
            textOpacity: 0.85,
            textSize: 12,
            textDy: 12,
            textWeight: 'bold',
            textHaloRadius: 2,
            textHaloFill: 'white',
            textHaloOpacity: 0.85,
        },
    ],
}

window.map = new maptalks.Map('map', {
    center: [121.47362991, 31.23047407],
    zoom: 16,
    pitch: 15,
    scaleControl: {
        position: { bottom: '1', right: '0' },
        metric: true,
        imperial: false,
    },
    doubleClickZoom: window.debug,
    baseLayer: new maptalks.TileLayer('baseLayer', {
        subdomains: ['01', '02', '03', '04'],
        placeholder: true,
        maxAvailableZoom: 18,
        urlTemplate:
            'https://wprd{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
    }),
    layers: [
        new maptalks.VectorLayer('risk', { style: riskStyle }),
        new maptalks.VectorLayer('track'),
    ],
})

export {}
