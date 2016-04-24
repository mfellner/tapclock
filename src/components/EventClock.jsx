import React, { Component, PropTypes } from 'react'
import { Map, OrderedMap } from 'immutable'

import EventList from './EventList.jsx'
import { SessionRecord } from '../model'

export default class EventClock extends Component {
  static propTypes = {
    session: PropTypes.instanceOf(SessionRecord).isRequired,
    events: PropTypes.instanceOf(OrderedMap).isRequired,
    punchClock: PropTypes.func.isRequired,
    clearClock: PropTypes.func.isRequired
  }

  clearClock() {
    this.props.clearClock(this.props.session._id)
  }

  eventButton(name) {
    const currentEvent = this.props.events.last() || {}
    return <button onClick={this.props.punchClock.bind(this, this.props.session._id, name)}
                   disabled={currentEvent.name === name}>{name}</button>
  }

  render() {
    return (
      <div>
        <div>
          {this.eventButton('work')}
          &nbsp;
          {this.eventButton('break')}
          &nbsp;
          {this.eventButton('stop')}
          &nbsp;
          <button onClick={this.clearClock.bind(this)}>clear</button>
        </div>
        <EventList events={this.props.events}/>
      </div>
    )
  }
}
