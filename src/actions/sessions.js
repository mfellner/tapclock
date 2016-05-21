import uuid from 'uuid'
import logger from '../debug'
import SessionRecord from '../model/SessionRecord'

const log = logger('actions:sessions')

export const CREATE_SESSION = Symbol('create session')
export const DELETE_SESSION = Symbol('delete session')

const createSessionAction = (payload = null) => ({
  type: CREATE_SESSION,
  payload
})

const deleteSessionAction = (payload = null) => ({
  type: DELETE_SESSION,
  payload
})

export function createSession(name) {
  log('create session "%s"', name)
  return (dispatch) => {
    dispatch(createSessionAction(new SessionRecord({_id: uuid.v4(), name})))
  }
}

export function deleteSession(session_id) {
  log('delete session %s', session_id)
  return (dispatch) => {
    dispatch(deleteSessionAction(session_id))
  }
}
