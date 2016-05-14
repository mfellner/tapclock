import moment from 'moment'
import { Set } from 'immutable'

import logger from './debug'

const log = logger('report')

function roundSeconds(millis) {
  return Math.round(millis / 1000) * 1000
}

export default class Report {
  constructor(session, events) {
    this.session = session
    this.events = events.sortBy(e => e.time).toIndexedSeq()
  }

  get eventTypes() {
    return this.events.map(record => record.type).toSet()
  }

  get totalTime() {
    const start = this.events.first().get('time')
    const end = this.events.last().get('time')
    const dt = end.diff(start)
    return moment(roundSeconds(dt)).utc().format('HH:mm:ss')
  }

  getCumulatedTime(...eventTypes) {
    const types = Set.of(...eventTypes)

    const getEndTime = (beginEvent) => {
      const beginIndex = this.events.findKey(e => e._id === beginEvent._id)
      return this.events
                 .slice(beginIndex)
                 .find(e => !types.includes(e.type), this.events.last())
                 .get('time')
    }

    const dt = this.events
                   .filter(event => types.includes(event.type))
                   .reduce((total, beginEvent) => {
                     const end = getEndTime(beginEvent)
                     const dt = end.diff(beginEvent.time)
                     return total + dt
                   }, 0)
    return moment(roundSeconds(dt)).utc().format('HH:mm:ss')
  }
}
