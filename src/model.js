import { Record as IRecord } from 'immutable'

export class Record extends IRecord({event: null, time: null}) {
  static isRecord(iterable) {
    return iterable.has('event') && iterable.has('time')
  }

  static fromIterable(iterable) {
    return new Record(iterable.map((v, k) => k === 'time' ? new Date(v) : v).toObject())
  }
}
