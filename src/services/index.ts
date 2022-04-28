const time = new Date().getTime()

const fetchGeoJSON = (fileName: string, noCache?: boolean) => async () => {
  let url = `./data/${fileName}.geojson`
  if (noCache) url += `?_t=${time}`
  const result = await fetch(url)
  const features = await result.json()
  return features
}

export const getRisk = fetchGeoJSON('risk', true)
export const getTrackMarch = fetchGeoJSON('track_march')
export const getTrackLong = fetchGeoJSON('track_long', true)
export const getTrackM = fetchGeoJSON('track_m', true)
export const getTrack14 = fetchGeoJSON('track_14', true)
export const getTrack7 = fetchGeoJSON('track_7', true)
export const getTrack3 = fetchGeoJSON('track_3', true)
