const dotenv = require('dotenv')
const fs = require('fs-extra')
const axios = require('axios')

dotenv.config({ path: '.env.local' })

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const geoRisk = async () => {
  const risk = await fs.readJson('public/source/risk.json')
  const collection = await getGeoCollection(risk)
  await fs.writeFile('public/data/risk.geojson', JSON.stringify(collection))
}

const getGeoCollection = async (risk) => {
  let result = { type: 'FeatureCollection', features: [] }
  for (const key in risk) {
    console.log(key)
    const results = await Promise.all(
      Object.entries(risk[key]).map(([town, arr]) =>
        geoAddrArr(arr, town, key),
      ),
    )
    result.features = results.flat().concat(result.features)
  }
  return result
}

const geoAddrArr = async (arr, town, type) => {
  if (arr.length > 0) console.log(`${town}: ${arr.length}`)
  let features = []
  const recursive = async () => {
    if (arr.length === 0) return
    const end = Math.min(arr.length, 1)
    const items = arr.splice(0, end)
    const results = await Promise.all(
      items.map((addr) => geoAddr(addr, type, town, arr.length)),
    )
    features = [...features, ...results]
    await recursive()
  }
  await recursive()
  return features
}

const geoAddr = async (addr, type, town, length) => {
  const url = 'https://restapi.amap.com/v3/geocode/geo'
  const address = town ? `${town}${addr}` : addr
  const result = await axios.get(url, {
    params: { key: process.env.AMAP_KEY, city: '上海', address },
  })
  const data = result.data.geocodes[0]
  if (town) sleep(length)
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: JSON.parse(`[${data.location}]`),
    },
    properties: {
      type,
      town,
      published_address: addr,
      geocoded_address: data.formatted_address,
    },
  }
}

geoRisk()
