const { maptalks } = window

window.map = new maptalks.Map('map', {
    center: [121.47362991, 31.23047407],
    zoom: 16,
    pitch: 15,
    doubleClickZoom: false,
    baseLayer: new maptalks.TileLayer('baseLayer', {
        subdomains: ['01', '02', '03', '04'],
        placeholder: true,
        maxAvailableZoom: 18,
        urlTemplate:
            'https://wprd{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
    }),
})

navigator.geolocation.getCurrentPosition(
    (position) => {
        const { longitude, latitude } = position.coords
        window.map.animateTo({ center: [longitude, latitude] })
    },
    (error) => {
        console.error(error)
    },
    { enableHighAccuracy: true, timeout: 7000, maximumAge: 45000 }
)

export {}
