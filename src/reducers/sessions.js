import { Map } from 'immutable'
import logger from '../debug'
import { CREATE_SESSION, DELETE_SESSION } from '../actions/sessions'

const log = logger('reducers:sessions')

export default function sessions(state = Map(), action) {
  switch (action.type) {
    case CREATE_SESSION:
      return state.set(action.payload.get('_id'), action.payload)
    case DELETE_SESSION:
    {
      log('delete session %s', action.payload)
      return state.filter((v, k) => k !== action.payload)
    }
    default:
      return state
  }
}
