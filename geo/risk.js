const path = require('path')
const fs = require('fs-extra')

const { geoAddrArr } = require('./api')

const geoRisk = async () => {
    const riskJSON = path.join('public', 'risk.json')
    const risk = await fs.readJson(riskJSON)
    const collection = await geoAddrArr(risk)
    const riskGeoJSON = path.join('public', 'risk.geojson')
    await fs.writeFile(riskGeoJSON, JSON.stringify(collection, null, 2))
}

geoRisk()
