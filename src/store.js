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
  const state = JSON.parse(localStorage.getItem(STORAGE_KEY))
  state.time.records = state.time.records.map(s => new Date(s))
  return state
}
