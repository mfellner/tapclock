import { Map } from 'immutable'

import { PUNCH_CLOCK, CLEAR_CLOCK } from '../actions/events'

export default function events(state = Map(), action) {
  switch (action.type) {
    case PUNCH_CLOCK:
      return state.set(action.payload.get('_id'), action.payload)
    case CLEAR_CLOCK:
      return state.filter(v => v.get('session_id') !== action.payload)
    default:
      return state
  }
}
