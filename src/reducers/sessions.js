import { Map } from 'immutable'

import { CREATE_SESSION, DELETE_SESSION } from '../actions/sessions'
import { CLEAR_STORE } from '../actions/store'

export default function sessions(state = Map(), action) {
  switch (action.type) {
    case CREATE_SESSION:
      return state.set(action.payload.get('_id'), action.payload)
    case DELETE_SESSION:
      return state.delete(action.payload)
    case CLEAR_STORE:
      return Map()
    default:
      return state
  }
}
