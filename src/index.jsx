import React from 'react'
import ReactDOM from 'react-dom'

import Root from './components/Root.jsx'
import { createStore, getSavedState } from './store'

const initialState = getSavedState() || undefined
const store = createStore(initialState)
const root = document.getElementById('main')

ReactDOM.render(<Root store={store}/>, root)
