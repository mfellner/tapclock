import thunk from 'redux-thunk'
import createEngine from 'redux-storage-engine-localstorage'
import filterStorage  from 'redux-storage-decorator-filter'
import { fromJS, Iterable } from 'immutable'
import * as redux from 'redux'
import * as storage from 'redux-storage'

import logger from './debug'
import rootReducer from './reducers'
import { recordFromIterable } from './model'

const log = logger('store')

const engine = filterStorage(createEngine(STORAGE_KEY), [
  'sessions', 'events'
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
  log('Parse state %o', json)
  return fromJS(JSON.parse(json), function (key, value) {
    try {
      return recordFromIterable(value)
    } catch (e) {
      // log('No model for state %s: %o', key, value.toObject())
      return Iterable.isIndexed(value) ? value.toList() : value.toMap()
    }
  })
}
