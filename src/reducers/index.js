import { combineReducers } from 'redux-immutable'

import clock from './clock'

const rootReducer = combineReducers({
  clock
})

export default rootReducer
