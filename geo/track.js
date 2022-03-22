const path = require('path')
const fs = require('fs-extra')
const dayjs = require('dayjs')

const { geoAddrArr } = require('./api')
const today = dayjs().format('YYYY-MM-DD')

const geoTrackToday = async () => {
    const trackJSON = path.join('public', 'track.json')
    const track = await fs.readJson(trackJSON)
    const trackToday = track[today]
    const collection = await geoAddrArr(trackToday)
    await updateTrackGeoJSON(collection)
}

const geoTrackAll = async () => {
    const trackJSON = path.join('public', 'track.json')
    const track = await fs.readJson(trackJSON)
    const dates = Object.keys(track)
    const recursive = async (index = 0) => {
        if (index === dates.length) return
        const date = dates[index]
        const trackItem = track[date]
        const collection = await geoAddrArr(trackItem)
        await updateTrackGeoJSON(collection, date)
        await recursive(index + 1)
    }
    await recursive()
}

const updateTrackGeoJSON = async (collection, date = today) => {
    const trackGeoJSON = path.join('public', 'track.geojson')
    let obj = {}
    try {
        obj = await fs.readJson(trackGeoJSON)
    } catch (error) {
        console.error('No such file, new.')
    }
    if (obj[date]) {
        obj[date] = collection
    } else {
        obj = { ...obj, [date]: collection }
    }
    await fs.writeFile(trackGeoJSON, JSON.stringify(obj, null, 2))
}

geoTrackToday()
// geoTrackAll()
