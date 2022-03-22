const { maptalks } = window

window.map = new maptalks.Map('map', {
    center: [121.47362991, 31.23047407],
    zoom: 16,
    pitch: 15,
    doubleClickZoom: window.debug,
    baseLayer: new maptalks.TileLayer('baseLayer', {
        subdomains: ['01', '02', '03', '04'],
        placeholder: true,
        maxAvailableZoom: 18,
        urlTemplate:
            'https://wprd{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
    }),
})

export {}
