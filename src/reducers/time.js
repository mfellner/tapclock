import { PUNCH_CLOCK, CLEAR_CLOCK } from '../actions/clock'

function records(state = [], action) {
  switch (action.type) {
    case PUNCH_CLOCK:
      return state.concat(action.payload)
    case CLEAR_CLOCK:
      return []
    default:
      return state
  }
}

export default function time(state = {records: []}, action) {
  switch (action.type) {
    case PUNCH_CLOCK:
    case CLEAR_CLOCK:
      return Object.assign({}, state, {
        records: records(state.records, action)
      })
    default:
      return state
  }
}
