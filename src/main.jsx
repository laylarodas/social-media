import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css'
import './assets/css/normalize.css'
import './assets/css/styles.css'
import './assets/css/responsive.css'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import es from 'javascript-time-ago/locale/es.json'


TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)


ReactDOM.createRoot(document.getElementById('root')).render(

    <App />
)
