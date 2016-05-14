import uuid from 'uuid'
import moment from 'moment'
import { fromJS, Record } from 'immutable'

import logger from './debug'

const log = logger('model')

export class SessionRecord extends Record({_id: null, name: null}) {
  static isType(iterable) {
    return iterable.count() === 2
      && iterable.has('_id')
      && iterable.has('name')
  }

  static fromIterable(iterable) {
    return new SessionRecord(iterable.toJS())
  }
}

const WORK_EVENT = 'WORK_EVENT'
const BREAK_EVENT = 'BREAK_EVENT'
const NULL_EVENT = 'NULL_EVENT'
const NOW_EVENT = 'NOW_EVENT'
const END_EVENT = 'END_EVENT'

export class EventRecord extends Record({
  _id: null,
  session_id: null,
  type: null,
  name: null,
  time: null,
  isNow: false,
  isEnd: false
}) {
  constructor(kwargs) {
    super({_id: uuid.v4(), time: moment(), ...kwargs})
  }

  static isType(iterable) {
    return iterable.count() === 7
      && iterable.has('_id')
      && iterable.has('session_id')
      && iterable.has('type')
      && iterable.has('name')
      && iterable.has('time')
      && iterable.has('isNow')
      && iterable.has('isEnd')
  }

  static getClass(type) {
    return fromJS({
      [WORK_EVENT]: WorkEvent,
      [BREAK_EVENT]: BreakEvent,
      [NULL_EVENT]: NullEvent,
      [NOW_EVENT]: NowEvent,
      [END_EVENT]: EndEvent
    })
    .get(type, EventRecord)
  }

  static fromIterable(iterable) {
    const Class = EventRecord.getClass(iterable.get('type'))
    return new Class(iterable.map((v, k) => k === 'time' ? moment(v) : v).toJS())
  }
}

export class WorkEvent extends EventRecord {
  constructor(kwargs) {
    super({...kwargs, type: WORK_EVENT})
  }
}

export class BreakEvent extends EventRecord {
  constructor(kwargs) {
    super({...kwargs, type: BREAK_EVENT})
  }
}

export class NullEvent extends EventRecord {
  constructor() {
    super({type: NULL_EVENT})
  }
}

export class NowEvent extends EventRecord {
  constructor() {
    super({type: NOW_EVENT, time: moment(), isNow: true})
  }
}

export class EndEvent extends EventRecord {
  constructor(kwargs) {
    super({time: moment(), ...kwargs, _id: kwargs.session_id, type: END_EVENT, name: 'end', isEnd: true})
    if (!kwargs.session_id) throw new MissingAttributesError('EndEvent', 'session_id')
  }
}

class MissingAttributesError extends Error {
  constructor(record, attributes) {
    super(`Missing attributes for record ${record}: ${attributes}`)
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
  const type = selectType(iterable)
  return type.fromIterable(iterable)
}
