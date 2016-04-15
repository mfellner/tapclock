import { Record } from 'immutable'

export class TimeRecord extends Record({event: null, time: null}) {
  static isTimeRecord(iterable) {
    return iterable.has('event') && iterable.has('time')
  }

  static fromIterable(iterable) {
    return new TimeRecord(iterable.map((v, k) => k === 'time' ? new Date(v) : v).toObject())
  }
}
