import React from 'react'
import ReactDOM from 'react-dom'

import logger from './debug'
import Routes from './components/Routes.jsx'
import { createStore, getSavedState } from './store'

const log = logger('index')
const initialState = getSavedState() || undefined
const store = createStore(initialState)
const root = document.getElementById('main')

// log('Render with initial state %o', initialState.toJS())

ReactDOM.render(<Routes store={store}/>, root)
