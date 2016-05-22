import React, { Component, PropTypes } from 'react'

import EventRecord from '../model/EventRecord'
import { Row, Col, Button, Table } from '../components/layout'

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
      <tr>
        <th scope="row">{this.props.event.name}</th>
        <td>{this.props.event.time.calendar()}</td>
        <td>{this.props.children}</td>
        <td>
          <Button pullRight="xs"
                  bsSize="sm"
                  bsStyle="danger"
                  outline={true}
                  onClick={this.deleteEvent.bind(this)}
                  disabled={this.props.hasTerminated}>delete</Button>
        </td>
      </tr>
    )
  }
}
