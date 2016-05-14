import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import logger from '../debug'
import Report from '../report'
import EventClock from './../components/EventClock.jsx'
import { NullEvent } from '../model'
import { Row, Cell } from '../components/layout'
import { createEvent, deleteEvent, endEvents } from '../actions/events'

const log = logger('SessionDetail')

function mapStateToProps(state) {
  return {
    sessions: state.get('sessions'),
    events: state.get('events')
  }
}

export default class SessionDetail extends Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired,
    sessions: PropTypes.instanceOf(Map).isRequired,
    events: PropTypes.instanceOf(Map).isRequired,
    createEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    endEvents: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.setSession(this.props)
  }

  componentWillReceiveProps(props) {
    this.setSession(props)
  }

  setSession(props) {
    const session = props.sessions.get(props.routeParams.id)
    const events = props.events
                        .filter(e => e.session_id === session._id)
                        .sortBy(e => e.time)
    this.setState({
      session,
      events,
      currentEvent: events.last() || new NullEvent()
    })
  }

  hasTerminated() {
    return this.state.currentEvent.isEnd
  }

  sessionReport() {
    const report = new Report(this.state.session, this.state.events)
    return (
      <Row>
        <Cell><b>total time:</b> {report.totalTime}</Cell>
        <Cell><b>work time:</b> {report.getCumulatedTime('WORK_EVENT','FOO')}</Cell>
        <Cell><b>break time:</b> {report.getCumulatedTime('BREAK_EVENT')}</Cell>
      </Row>)
  }

  render() {
    return (
      <div>
        <Row>
          <Cell>
            <h1>{this.state.session.name}</h1>
            <EventClock createEvent={this.props.createEvent}
                        deleteEvent={this.props.deleteEvent}
                        endEvents={this.props.endEvents}
                        session={this.state.session}
                        events={this.state.events}
                        currentEvent={this.state.currentEvent}/>
          </Cell>
        </Row>
        {this.hasTerminated() ? this.sessionReport() : null}
        <Row>
          <Cell>
            <IndexLink to="/">back</IndexLink>
          </Cell>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  createEvent, deleteEvent, endEvents
})(SessionDetail)
