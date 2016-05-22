import React, { Component, PropTypes } from 'react'

import EventRecord from '../model/EventRecord'
import { Row, Col, Button } from '../components/layout'

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
      <Row>
        <Col xs={2} sm={2}>{this.props.event.name}</Col>
        <Col xs={3} sm={3}>start: {this.props.event.time.calendar()}</Col>
        <Col xs={3} sm={3}>{this.props.children}</Col>
        <Col xs={3} sm={4}>
          <Button bsSize="sm"
                  pullRight="xs"
                  onClick={this.deleteEvent.bind(this)}
                  disabled={this.props.hasTerminated}>delete</Button>
        </Col>
      </Row>
    )
  }
}
