const path = require('path')
const fs = require('fs-extra')

const { geoAddr } = require('./api')

const geoRisk = async () => {
    const riskJSON = path.join('public', 'risk.json')
    const risk = await fs.readJson(riskJSON)
    const collection = await geo2Features(risk)
    const riskGeoJSON = path.join('public', 'risk.geojson')
    await fs.writeFile(riskGeoJSON, JSON.stringify(collection, null, 2))
}

const geo2Features = async (risk) => {
    let features = []
    const recursiveAjax = async () => {
        if (risk.length === 0) return
        const end = Math.min(risk.length, 5)
        const items = risk.splice(0, end)
        const results = await Promise.all(items.map(geoAddr))
        features = [...features, ...results]
        await recursiveAjax()
    }
    await recursiveAjax()
    return { type: 'FeatureCollection', features }
}

geoRisk()
