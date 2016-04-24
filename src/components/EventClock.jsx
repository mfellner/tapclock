import React, { Component, PropTypes } from 'react'
import { OrderedMap } from 'immutable'

import logger from '../debug'
import EventList from './EventList.jsx'
import { SessionRecord, EventRecord } from '../model'
import { Row, Cell } from '../components/layout'

const log = logger('EventClock')

export default class EventClock extends Component {
  static propTypes = {
    session: PropTypes.instanceOf(SessionRecord).isRequired,
    events: PropTypes.instanceOf(OrderedMap).isRequired,
    currentEvent: PropTypes.instanceOf(EventRecord).isRequired,
    createEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    endEvents: PropTypes.func.isRequired
  }

  hasTerminated() {
    return this.props.currentEvent.isEnd
  }

  eventButton(name) {
    return <button onClick={this.props.createEvent.bind(this, this.props.session._id, name)}
                   disabled={this.props.currentEvent.name === name || this.hasTerminated()}>{name}</button>
  }

  endEventsButton() {
    return <button onClick={this.props.endEvents.bind(this, this.props.session._id)}
                   disabled={this.hasTerminated()}>stop</button>
  }

  render() {
    return (
      <div>
        <Row>
          <Cell>{this.eventButton('work')}</Cell>
          <Cell>{this.eventButton('break')}</Cell>
          <Cell>{this.endEventsButton()}</Cell>
        </Row>
        <EventList events={this.props.events}
                   deleteEvent={this.props.deleteEvent}
                   hasTerminated={this.hasTerminated()}/>
      </div>
    )
  }
}
