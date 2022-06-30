const time = new Date().getTime()

const fetchGeoJSON = async (fileName: string) => {
  const url = `./data/${fileName}.geojson?_t=${time}`
  const result = await fetch(url)
  const features = await result.json()
  return features
}

const fetchGeoJSONCDN = async (fileName: string) => {
  const url = window.debug
    ? `./data/${fileName}.geojson`
    : `https://cdn.jsdelivr.net/gh/cxiaof/sh-track-info-map/build/data/${fileName}.geojson`
  const result = await fetch(url)
  const features = await result.json()
  return features
}

export const getRisk = async () => fetchGeoJSON('risk')
export const getTrackLong = async () =>
  Promise.all([
    fetchGeoJSON('track_long'),
    fetchGeoJSONCDN('track_may'),
    fetchGeoJSONCDN('track_april_late'),
    fetchGeoJSONCDN('track_april_early'),
    fetchGeoJSONCDN('track_march'),
  ])
export const getTrackM = async () => fetchGeoJSON('track_m')
export const getTrack14 = async () => fetchGeoJSON('track_14')
export const getTrack7 = async () => fetchGeoJSON('track_7')
export const getTrack3 = async () => fetchGeoJSON('track_3')
