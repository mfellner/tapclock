import { Record, Map } from 'immutable'

import { CustomEvent } from './EventRecord'
import { requireAttributes } from './index'
import logger from'../debug'

const log = logger('Template')

export default class Template extends Record({
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

  static defaults() {
    return Map.of(
      'work', new Template({custom_type: 'work'}),
      'break', new Template({custom_type: 'break'})
    )
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
