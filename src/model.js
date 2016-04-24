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

export class EventRecord extends Record({
  _id: null,
  session_id: null,
  name: null,
  time: null,
  isNow: false,
  isEnd: false
}) {
  static isType(iterable) {
    return iterable.count() === 6
      && iterable.has('_id')
      && iterable.has('session_id')
      && iterable.has('name')
      && iterable.has('time')
      && iterable.has('isNow')
      && iterable.has('isEnd')
  }

  static fromIterable(iterable) {
    return new EventRecord(iterable.map((v, k) => k === 'time' ? moment(v) : v).toObject())
  }
}

export class NullEvent extends EventRecord {
}

export class NowEvent extends EventRecord {
  constructor() {
    super({time: moment(), isNow: true})
  }
}

export class EndEvent extends EventRecord {
  constructor(_id) {
    super({_id, session_id: _id, name: 'end', time: moment(), isEnd: true})
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
