import uuid from 'uuid'
import moment from 'moment'
import logger from '../debug'
import { EventRecord, EndEvent } from '../model'

const log = logger('actions:events')

export const CREATE_EVENT = Symbol('create event')
export const DELETE_EVENT = Symbol('delete event')

const createEventAction = (payload = null) => ({
  type: CREATE_EVENT,
  payload
})

const deleteEventAction = (payload = null) => ({
  type: DELETE_EVENT,
  payload
})

export function createEvent(session_id, name) {
  log('create event "%s" in session %s', name, session_id)
  return (dispatch) => {
    dispatch(createEventAction(new EventRecord({_id: uuid.v4(), session_id, name, time: moment()})))
  }
}

export function endEvents(session_id) {
  log('end events for session %s', session_id)
  return (dispatch) => {
    dispatch(createEventAction(new EndEvent(session_id)))
  }
}

export function deleteEvent(event_id) {
  log('delete event %s', event_id)
  return (dispatch) => {
    dispatch(deleteEventAction(event_id))
  }
}
