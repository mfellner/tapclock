import uuid from 'uuid'
import moment from 'moment'
import { Record, Map } from 'immutable'

import logger from'../debug'
import { requireAttributes } from './index'

const log = logger('EventRecord')

const CUSTOM_EVENT = 'CUSTOM_EVENT'
const NULL_EVENT = 'NULL_EVENT'
const NOW_EVENT = 'NOW_EVENT'
const END_EVENT = 'END_EVENT'

class NoSuchEventTypeError extends Error {
  constructor(type) {
    super(`No such event type: ${JSON.stringify(type)}`)
  }
}

export default class EventRecord extends Record({
  _class: 'EventRecord',
  _id: null,
  session_id: null,
  type: null,
  custom_type: null,
  name: null,
  time: null,
  isNow: false,
  isEnd: false
}) {
  constructor(kwargs) {
    super({_id: uuid.v4(), time: moment(), ...kwargs})
  }

  static isType(iterable) {
    return iterable.count() === 9
      && (iterable.get('_class') === 'EventRecord')
      && iterable.has('_id')
      && iterable.has('session_id')
      && iterable.has('type')
      && iterable.has('custom_type')
      && iterable.has('name')
      && iterable.has('time')
      && iterable.has('isNow')
      && iterable.has('isEnd')
  }
  
  static getClass(type) {
    const Class = {
      [CUSTOM_EVENT]: CustomEvent,
      [NULL_EVENT]: NullEvent,
      [NOW_EVENT]: NowEvent,
      [END_EVENT]: EndEvent
    }[type]
    if (!Class) throw new NoSuchEventTypeError(type)
    return Class
  }

  static fromIterable(iterable) {
    const Class = EventRecord.getClass(iterable.get('type'))
    return new Class(iterable.map((v, k) => k === 'time' ? moment(v) : v).toJS())
  }
}

export class CustomEvent extends EventRecord {
  constructor(kwargs) {
    super({
      ...requireAttributes('CustomEvent', kwargs, 'session_id', 'custom_type', 'name'),
      type: CUSTOM_EVENT
    })
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
    super({
      time: moment(),
      ...requireAttributes('EndEvent', kwargs, 'session_id'),
      _id: kwargs.session_id,
      type: END_EVENT,
      name: 'end',
      isEnd: true
    })
  }
}
