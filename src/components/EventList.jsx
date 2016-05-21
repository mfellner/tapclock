import React, { Component, PropTypes } from 'react'
import { OrderedMap } from 'immutable'

import logger from '../debug'
import EventView from './EventView.jsx'
import EventTimeView from './EventTimeView.jsx'
import { NowEvent } from '../model/EventRecord'
import { Row, Cell } from '../components/layout'

const log = logger('EventList')

export default class EventList extends Component {
  static propTypes = {
    events: PropTypes.instanceOf(OrderedMap).isRequired,
    deleteEvent: PropTypes.func.isRequired,
    hasTerminated: PropTypes.bool.isRequired
  }

  render() {
    const events = this.props.events
    const eventKeys = this.props.events.keySeq()
    const endEvent = this.props.hasTerminated ? events.last() : new NowEvent()

    return (
      <div>
        {eventKeys.map((key, i, keys) => (
          <Row key={key}>
            <Cell>
              <EventView event={events.get(key)}
                         deleteEvent={this.props.deleteEvent}
                         hasTerminated={this.props.hasTerminated}>
                <EventTimeView start={events.get(key)} end={events.get(keys.get(i + 1), endEvent)}/>
              </EventView>
            </Cell>
          </Row>
        ))}
      </div>
    )
  }
}
