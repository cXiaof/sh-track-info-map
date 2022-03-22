const path = require('path')

const geoTrack = async () => {
    const trackJSON = path.join('public', 'track.json')
    console.log(trackJSON)
}

geoTrack()
