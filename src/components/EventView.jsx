import React, { Component, PropTypes } from 'react'
import { EventRecord } from '../model'

export default class EventView extends Component {
  static propTypes = {
    event: PropTypes.instanceOf(EventRecord).isRequired
  }

  render() {
    return (
      <div>
        <span>{this.props.event.name}&nbsp;</span>
        <span>{this.props.event.time.calendar()}</span>
        {this.props.children}
      </div>
    )
  }
}
