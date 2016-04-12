import thunk from 'redux-thunk'
import createEngine from 'redux-storage-engine-localstorage'
import filterStorage  from 'redux-storage-decorator-filter'
import { fromJS, Iterable } from 'immutable'
import * as redux from 'redux'
import * as storage from 'redux-storage'

import rootReducer from './reducers'
import { Record } from './model'

const engine = filterStorage(createEngine(STORAGE_KEY), [
  'records'
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
  // console.log('parse state', json)
  return fromJS(JSON.parse(json), function (key, value) {
    // console.log(key, value, this)
    // For redux compatibility the root object must be a plain Object.
    if (key === '') return value.toObject()
    if (value.has('time')) return Record.fromIterable(value)

    return Iterable.isIndexed(value) ? value.toList() : value.toMap()
  })
}
