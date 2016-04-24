import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { OrderedMap } from 'immutable'

import EventView from './EventView.jsx'
import EventTimeView from './EventTimeView.jsx'
import { EventRecord } from '../model'

export default class EventList extends Component {
  static propTypes = {
    events: PropTypes.instanceOf(OrderedMap).isRequired
  }

  render() {
    const currentTime = new EventRecord({time: moment()})
    const events = this.props.events
    const eventKeys = this.props.events.keySeq()
    return (
      <div>
        {eventKeys.map((key, i, keys) => (
          <EventView key={i} event={events.get(key)}>
            <EventTimeView start={events.get(key)} end={events.get(keys.get(i + 1), currentTime)}/>
          </EventView>
        ))}
      </div>
    )
  }
}
