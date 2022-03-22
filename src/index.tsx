import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import dayjs from 'dayjs'

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

axios.get('./data/update_time.json').then(({ data }) => {
    document.title += dayjs(data).format('(更新至M月D日)')
})

reportWebVitals()
