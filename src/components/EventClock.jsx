import React, { Component, PropTypes } from 'react'
import { Map, OrderedMap } from 'immutable'

import EventList from './EventList.jsx'
import { SessionRecord } from '../model'
import { Row, Cell } from '../components/layout'

export default class EventClock extends Component {
  static propTypes = {
    session: PropTypes.instanceOf(SessionRecord).isRequired,
    events: PropTypes.instanceOf(OrderedMap).isRequired,
    createEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired
  }

  eventButton(name) {
    const currentEvent = this.props.events.last() || {}
    return <button onClick={this.props.createEvent.bind(this, this.props.session._id, name)}
                   disabled={currentEvent.name === name}>{name}</button>
  }

  render() {
    return (
      <div>
        <Row>
          <Cell>{this.eventButton('work')}</Cell>
          <Cell>{this.eventButton('break')}</Cell>
          <Cell>{this.eventButton('stop')}</Cell>
        </Row>
        <EventList events={this.props.events} deleteEvent={this.props.deleteEvent}/>
      </div>
    )
  }
}
