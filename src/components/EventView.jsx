import React, { Component, PropTypes } from 'react'
import { EventRecord } from '../model'

export default class EventView extends Component {
  static propTypes = {
    event: PropTypes.instanceOf(EventRecord).isRequired,
    deleteEvent: PropTypes.func.isRequired
  }

  deleteEvent() {
    this.props.deleteEvent(this.props.event._id)
  }

  render() {
    return (
      <div>
        <span>{this.props.event.name}&nbsp;</span>
        <span>{this.props.event.time.calendar()}</span>
        <button onClick={this.deleteEvent.bind(this)}>delete</button>
        {this.props.children}
      </div>
    )
  }
}
