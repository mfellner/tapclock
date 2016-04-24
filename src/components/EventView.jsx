import React, { Component, PropTypes } from 'react'

import { EventRecord } from '../model'
import { Row, Cell } from '../components/layout'

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
        <Row>
          <Cell>{this.props.event.name}</Cell>
          <Cell>{this.props.event.time.calendar()}</Cell>
          <Cell>
            <button onClick={this.deleteEvent.bind(this)}>delete</button>
          </Cell>
        </Row>
        <Row>
          {this.props.children}
        </Row>
      </div>
    )
  }
}
