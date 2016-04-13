import { List } from 'immutable'

import { PUNCH_CLOCK, CLEAR_CLOCK } from '../../actions/clock'

export default function records(state = List(), action) {
  switch (action.type) {
    case PUNCH_CLOCK:
      return state.push(action.payload)
    case CLEAR_CLOCK:
      return state.clear()
    default:
      return state
  }
}
