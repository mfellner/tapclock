import React, { Component, PropTypes } from 'react'
import { Map, OrderedMap } from 'immutable'

import logger from '../debug'
import EventList from './EventList.jsx'
import SessionRecord from '../model/SessionRecord'
import EventRecord from '../model/EventRecord'
import { Row, Col, Button, ButtonGroup } from '../components/layout'

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
    const disabled = this.props.currentEvent.name === template.name || this.hasTerminated()
    return <Button key={template._id}
                   onClick={this.props.createEvent.bind(this, create)}
                   disabled={disabled}>{template.name}</Button>
  }

  endEventsButton() {
    return <Button bsStyle="warning"
                   outline={true}
                   onClick={this.props.endEvents.bind(this, this.props.session._id)}
                   disabled={this.hasTerminated()}>stop</Button>
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} sm={12}>
            <ButtonGroup marginBottom={1}>
              {this.props.templates.toIndexedSeq().map(template =>
                this.createEventButton(template)
              )}
              {this.endEventsButton()}
            </ButtonGroup>
          </Col>
        </Row>
        <EventList events={this.props.events}
                   deleteEvent={this.props.deleteEvent}
                   hasTerminated={this.hasTerminated()}/>
      </div>
    )
  }
}
