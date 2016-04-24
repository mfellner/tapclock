import uuid from 'uuid'
import moment from 'moment'
import logger from '../debug'
import { EventRecord } from '../model'

const log = logger('actions:events')

export const PUNCH_CLOCK = Symbol('punch clock')
export const CLEAR_CLOCK = Symbol('clear clock')

const punchClockAction = (payload = null) => ({
  type: PUNCH_CLOCK,
  payload
})

const clearClockAction = (payload = null) => ({
  type: CLEAR_CLOCK,
  payload
})

export function punchClock(session_id, name) {
  log('add event %s %s', session_id, name)
  return (dispatch) => {
    dispatch(punchClockAction(new EventRecord({_id: uuid.v4(), session_id, name, time: moment()})))
  }
}

export function clearClock(session_id) {
  log('clear events %s', session_id)
  return (dispatch) => {
    dispatch(clearClockAction(session_id))
  }
}
