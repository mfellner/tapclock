import { Map } from 'immutable'

import { CREATE_EVENT, DELETE_EVENT } from '../actions/events'
import { DELETE_SESSION } from '../actions/sessions'

export default function events(state = Map(), action) {
  switch (action.type) {
    case CREATE_EVENT:
      return state.set(action.payload.get('_id'), action.payload)
    case DELETE_EVENT:
      return state.delete(action.payload)
    case DELETE_SESSION:
      return state.filter(e => e.session_id !== action.payload)
    default:
      return state
  }
}
