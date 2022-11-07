const dotenv = require('dotenv')

const fs = require('fs-extra')
const axios = require('axios')
const dayjs = require('dayjs')

dotenv.config({ path: '.env.local' })

// const today = dayjs().format('YYYY-MM-DD')
const today = '2022-11-06'

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const geoTrackToday = async () => {
  const track = await fs.readJson('public/source/track.json')
  console.log('✔ 读取轨迹数据')
  const trackToday = track[today]
  if (trackToday) {
    const collection = await getGeoCollection(trackToday)
    console.log('✔ 查询轨迹信息')
    await updateTrackGeoJSON(collection)
  } else {
    await updateTrackGeoJSON()
  }
  console.log('✔ 更新轨迹文件')
  await splitJSON()
  console.log('✔ 轨迹分类')
  updateLastUpdateTime()
  console.log('✔ 更新日期')
}

const getGeoCollection = async (data) => {
  if (Array.isArray(data)) {
    const features = await geoAddrArr(data)
    return { type: 'FeatureCollection', features }
  } else {
    const results = await Promise.all(
      Object.entries(data).map(([town, arr]) => geoAddrArr(arr, town)),
    )
    return { type: 'FeatureCollection', features: results.flat() }
  }
}

const geoAddrArr = async (arr, town) => {
  let features = []
  const recursive = async () => {
    if (arr.length === 0) return
    const end = Math.min(arr.length, town ? 1 : 5)
    const items = arr.splice(0, end)
    const results = await Promise.all(
      items.map((addr) => geoAddr(addr, town, arr.length)),
    )
    features = [...features, ...results]
    await recursive()
  }
  await recursive()
  if (town) console.log(`${town}over`)
  return features
}

const geoAddr = async (addr, town, length) => {
  const url = 'https://restapi.amap.com/v3/geocode/geo'
  const address = town ? `${town}${addr}` : addr
  const result = await axios.get(url, {
    params: { key: process.env.AMAP_KEY, city: '上海', address },
  })
  const data = result.data.geocodes[0]
  if (town) await sleep(length * 10)
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: JSON.parse(`[${data.location}]`),
    },
    properties: {
      town,
      published_address: addr,
      geocoded_address: data.formatted_address,
    },
  }
}

const updateTrackGeoJSON = async (collection, date = today) => {
  const result = await axios.get(
    'https://cxiaof.github.io/sh-track-info-map/data/track.geojson',
  )
  let obj = result.data
  if (collection) {
    collection = addDate(collection, date)
    if (obj[date]) {
      obj[date] = collection
    } else {
      obj = { [date]: collection, ...obj }
    }
  }
  const trackGeoJSON = 'public/data/track.geojson'
  await fs.writeFile(trackGeoJSON, JSON.stringify(obj, null, 2))
}

const addDate = (collection, date) => {
  collection.features.forEach((feature) => {
    feature.properties.date = dayjs(date).valueOf()
  })
  return collection
}

const splitJSON = async () => {
  const track = await fs.readJson('public/data/track.geojson')
  let track_long = {}
  let track_m = {}
  let track_14 = {}
  let track_7 = {}
  let track_3 = {}
  for (const date in track) {
    if (dayjs(date).isBefore(dayjs().subtract(1, 'month'))) {
      track_long[date] = track[date]
    } else if (dayjs(date).isBefore(dayjs().subtract(14, 'day'))) {
      track_m[date] = track[date]
    } else if (dayjs(date).isBefore(dayjs().subtract(7, 'day'))) {
      track_14[date] = track[date]
    } else if (dayjs(date).isBefore(dayjs().subtract(3, 'day'))) {
      track_7[date] = track[date]
    } else {
      track_3[date] = track[date]
    }
  }
  await fs.writeFile(
    'public/data/track_long.geojson',
    JSON.stringify(track_long),
  )
  await fs.writeFile('public/data/track_m.geojson', JSON.stringify(track_m))
  await fs.writeFile('public/data/track_14.geojson', JSON.stringify(track_14))
  await fs.writeFile('public/data/track_7.geojson', JSON.stringify(track_7))
  await fs.writeFile('public/data/track_3.geojson', JSON.stringify(track_3))
}

const updateLastUpdateTime = () => {
  fs.writeFile('public/data/update_time.json', dayjs().valueOf().toString())
}

const geoTrackAll = async () => {
  const track = await fs.readJson('public/source/track.json')
  const dates = Object.keys(track)
  const recursive = async (index = 0) => {
    if (index === dates.length) return
    const date = dates[index]
    const trackItem = track[date]
    const collection = await getGeoCollection(trackItem)
    await updateTrackGeoJSON(collection, date)
    await recursive(index + 1)
  }
  await recursive()
  await splitJSON()
  updateLastUpdateTime()
}

// splitJSON()
geoTrackToday()
// geoTrackAll()
