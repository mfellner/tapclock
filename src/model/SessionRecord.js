import { Record } from 'immutable'
import logger from'../debug'

const log = logger('SessionRecord')

export default class SessionRecord extends Record({
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
