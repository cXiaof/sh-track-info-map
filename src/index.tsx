import React from 'react'
import ReactDOM from 'react-dom'

import './constants/projectConfig'
import './constants/mapConfig'

import './stylesheets/styles.scss'

import App from './containers/App'

import reportWebVitals from './reportWebVitals'

window.map.on('baselayerload', () => {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    )
})

fetch(`./data/update_time.json?_t=${Math.random()}`)
    .then((res) => res.json())
    .then((time) => {
        const date = new Date(time)
        const month = date.getMonth() + 1
        const day = date.getDate()
        document.title += `(更新至${month}月${day}日)`
    })

reportWebVitals()
