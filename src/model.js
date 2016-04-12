import { Record as IRecord } from 'immutable'

export class Record extends IRecord({time: null}) {
  static fromIterable(iterable) {
    return new Record(iterable.map((v, k) => k === 'time' ? new Date(v) : v).toObject())
  }
}
