import React, { Component, PropTypes } from 'react'

import { EventRecord } from '../model'
import { Row, Cell } from '../components/layout'

export default class EventView extends Component {
  static propTypes = {
    event: PropTypes.instanceOf(EventRecord).isRequired,
    deleteEvent: PropTypes.func.isRequired,
    hasTerminated: PropTypes.bool.isRequired
  }

  deleteEvent() {
    this.props.deleteEvent(this.props.event._id)
  }

  render() {
    if (this.props.event.isEnd) return null

    return (
      <div>
        <Row>
          <Cell>{this.props.event.name}</Cell>
          <Cell>start: {this.props.event.time.calendar()}</Cell>
          <Cell>{this.props.children}</Cell>
          <Cell>
            <button onClick={this.deleteEvent.bind(this)}
                    disabled={this.props.hasTerminated}>
              delete
            </button>
          </Cell>
        </Row>
      </div>
    )
  }
}
