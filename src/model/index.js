import { List } from 'immutable'

import SessionRecord from './SessionRecord'
import EventRecord from './EventRecord'
import Template from './Template'
import logger from'../debug'

const log = logger('model')

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

function selectType(iterable) {
  // log('selectType: %o %o %o', SessionRecord, EventRecord, Template)
  const Type = List.of(SessionRecord, EventRecord, Template).find(Type => {
    return Type.isType(iterable)
  })
  if (!Type) throw new NoMatchingTypeError(iterable)
  return Type
}

export function recordFromIterable(iterable) {
  const Type = selectType(iterable)
  return Type.fromIterable(iterable)
}

export function requireAttributes(record, kwargs, ...attributes) {
  for (let attr of attributes) {
    if (!kwargs[attr]) throw new MissingAttributesError(record, attr)
  }
  return kwargs
}
