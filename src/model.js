import uuid from 'uuid'
import moment from 'moment'
import { fromJS, Record, List, Map } from 'immutable'

import logger from './debug'

const log = logger('model')

export class SessionRecord extends Record({
  _class: 'SessionRecord',
  _id: null,
  name: null
}) {
  static isType(iterable) {
    return iterable.count() === 3
      && (iterable.get('_class') === 'SessionRecord')
      && iterable.has('_id')
      && iterable.has('name')
  }

  static fromIterable(iterable) {
    return new SessionRecord(iterable.toJS())
  }
}

const CUSTOM_EVENT = 'CUSTOM_EVENT'
const NULL_EVENT = 'NULL_EVENT'
const NOW_EVENT = 'NOW_EVENT'
const END_EVENT = 'END_EVENT'

export class EventRecord extends Record({
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
    const Class = EVENT_TYPES.get(type)
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

const EVENT_TYPES = fromJS({
  [CUSTOM_EVENT]: CustomEvent,
  [NULL_EVENT]: NullEvent,
  [NOW_EVENT]: NowEvent,
  [END_EVENT]: EndEvent
})

export class Template extends Record({
  _class: 'Template',
  _id: null,
  name: null,
  custom_type: null,
  eventCreator: function (session_id) {
    return () => new CustomEvent({session_id, name: this.name, custom_type: this.custom_type})
  }
}) {
  constructor(kwargs) {
    super({
      _id: kwargs.custom_type,
      name: kwargs.custom_type,
      ...requireAttributes('Template', kwargs, 'custom_type')
    })
  }

  static isType(iterable) {
    return iterable.count() === 4
      && (iterable.get('_class') === 'Template')
      && iterable.has('_id')
      && iterable.has('custom_type')
      && iterable.has('name')
  }

  static fromIterable(iterable) {
    return new Template(iterable.toJS())
  }
}

class MissingAttributesError extends Error {
  constructor(record, attributes) {
    super(`Missing attributes for record ${record}: ${attributes}`)
  }
}

class NoSuchEventTypeError extends Error {
  constructor(type) {
    super(`No such event type: ${JSON.stringify(type)}`)
  }
}

class NoMatchingTypeError extends Error {
  constructor(iterable) {
    super(`No matching type for ${JSON.stringify(iterable.toJSON())}`)
  }
}

function requireAttributes(record, kwargs, ...attributes) {
  for (let attr of attributes) {
    if (!kwargs[attr]) throw new MissingAttributesError(record, attr)
  }
  return kwargs
}

const RECORD_TYPES = List.of(SessionRecord, EventRecord, Template)

function selectType(iterable) {
  const Type = RECORD_TYPES.find(Type => {
    return Type.isType(iterable)
  })
  if (!Type) throw new NoMatchingTypeError(iterable)
  return Type
}

export function recordFromIterable(iterable) {
  const Type = selectType(iterable)
  return Type.fromIterable(iterable)
}

export const DEFAULT_TEMPLATES = Map.of(
  'work', new Template({custom_type: 'work'}),
  'break', new Template({custom_type: 'break'})
)
