import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './components/Routes.jsx'
import { createStore, getSavedState } from './store'

const initialState = getSavedState() || undefined
const store = createStore(initialState)
const root = document.getElementById('main')

ReactDOM.render(<Routes store={store}/>, root)
