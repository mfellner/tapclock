import moment from 'moment'
import { Record } from 'immutable'

export class SessionRecord extends Record({_id: null, name: null}) {
  static isType(iterable) {
    return iterable.count() === 2
      && iterable.has('_id')
      && iterable.has('name')
  }

  static fromIterable(iterable) {
    return new SessionRecord(iterable.toObject())
  }
}

export class EventRecord extends Record({_id: null, session_id: null, name: null, time: null}) {
  static isType(iterable) {
    return iterable.count() === 4
      && iterable.has('_id')
      && iterable.has('session_id')
      && iterable.has('name')
      && iterable.has('time')
  }

  static fromIterable(iterable) {
    return new EventRecord(iterable.map((v, k) => k === 'time' ? moment(v) : v).toObject())
  }
}

class NoMatchingTypeError extends Error {
  constructor(iterable) {
    super(`No matching type for ${JSON.stringify(iterable.toJSON())}`)
  }
}

const types = [SessionRecord, EventRecord]

function selectType(iterable) {
  for (let Type of types) {
    if (Type.isType(iterable)) return Type
  }
  throw new NoMatchingTypeError(iterable)
}

export function recordFromIterable(iterable) {
  return selectType(iterable).fromIterable(iterable)
}
