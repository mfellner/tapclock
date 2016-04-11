import thunk from 'redux-thunk'
import createEngine from 'redux-storage-engine-localstorage'
import filterStorage  from 'redux-storage-decorator-filter'
import * as redux from 'redux'
import * as storage from 'redux-storage'

import rootReducer from './reducers'

const engine = filterStorage(createEngine(STORAGE_KEY), [
  'time'
])

const createStoreWithMiddleware = redux.applyMiddleware(
  thunk, storage.createMiddleware(engine)
)(redux.createStore)

export function createStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}

export function getSavedState() {
  return parseState(localStorage.getItem(STORAGE_KEY))
}

function parseState(json) {
  const state = JSON.parse(json)
  if (!state) return null
  state.time.records = state.time.records.map(s => new Date(s))
  return state
}
