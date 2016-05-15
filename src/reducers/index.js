import { combineReducers } from 'redux-immutable'

import templates from './templates'
import sessions from './sessions'
import events from './events'

const rootReducer = combineReducers({
  templates,
  sessions,
  events
})

export default rootReducer
