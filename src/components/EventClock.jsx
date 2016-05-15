import React, { Component, PropTypes } from 'react'
import { Map, OrderedMap } from 'immutable'

import logger from '../debug'
import EventList from './EventList.jsx'
import { SessionRecord, EventRecord } from '../model'
import { Row, Cell } from '../components/layout'

const log = logger('EventClock')

export default class EventClock extends Component {
  static propTypes = {
    session: PropTypes.instanceOf(SessionRecord).isRequired,
    events: PropTypes.instanceOf(OrderedMap).isRequired,
    templates: PropTypes.instanceOf(Map).isRequired,
    currentEvent: PropTypes.instanceOf(EventRecord).isRequired,
    createEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    endEvents: PropTypes.func.isRequired
  }

  hasTerminated() {
    return this.props.currentEvent.isEnd
  }

  createEventButton(template) {
    const create = template.eventCreator(this.props.session._id)
    return <button onClick={this.props.createEvent.bind(this, create)}
                   disabled={this.props.currentEvent.name === name || this.hasTerminated()}>{template.name}</button>
  }

  endEventsButton() {
    return <button onClick={this.props.endEvents.bind(this, this.props.session._id)}
                   disabled={this.hasTerminated()}>stop</button>
  }

  render() {
    return (
      <div>
        <Row>
          {this.props.templates.toIndexedSeq().map(template =>
            <Cell key={template._id}>{this.createEventButton(template)}</Cell>
          )}
          <Cell>{this.endEventsButton()}</Cell>
        </Row>
        <EventList events={this.props.events}
                   deleteEvent={this.props.deleteEvent}
                   hasTerminated={this.hasTerminated()}/>
      </div>
    )
  }
}
