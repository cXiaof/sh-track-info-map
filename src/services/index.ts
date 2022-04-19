const time = new Date().getTime()

const fetchGeoJSON = (fileName: string) => async () => {
  const result = await fetch(`./data/${fileName}.geojson?_t=${time}`)
  const features = await result.json()
  return features
}

export const getRisk = fetchGeoJSON('track_m')
export const getTrackLong = fetchGeoJSON('track_long')
export const getTrackM = fetchGeoJSON('track_m')
export const getTrack14 = fetchGeoJSON('track_14')
export const getTrack7 = fetchGeoJSON('track_7')
export const getTrack3 = fetchGeoJSON('track_3')
