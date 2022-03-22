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

reportWebVitals()
