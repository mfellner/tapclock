import logger from '../debug'
import { EndEvent } from '../model/EventRecord'

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

export function createEvent(create) {
  const event = create()
  log('create event "%s" in session %s', event.name, event.session_id)
  return (dispatch) => {
    dispatch(createEventAction(event))
  }
}

export function endEvents(session_id) {
  log('end events for session %s', session_id)
  return (dispatch) => {
    dispatch(createEventAction(new EndEvent({session_id})))
  }
}

export function deleteEvent(event_id) {
  log('delete event %s', event_id)
  return (dispatch) => {
    dispatch(deleteEventAction(event_id))
  }
}
