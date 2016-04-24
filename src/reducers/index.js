import { combineReducers } from 'redux-immutable'

import sessions from './sessions'
import events from './events'

const rootReducer = combineReducers({
  sessions,
  events
})

export default rootReducer
