import { combineReducers } from 'redux-immutable'

import records from './records'
import { PUNCH_CLOCK, CLEAR_CLOCK } from '../../actions/clock'

function currentEvent(state = '', action) {
  switch (action.type) {
    case PUNCH_CLOCK:
      return action.payload.event
    case CLEAR_CLOCK:
      return ''
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currentEvent, records
})

export default rootReducer
