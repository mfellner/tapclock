import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import EventClock from './../components/EventClock.jsx'
import { createEvent, deleteEvent } from '../actions/events'

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
    deleteEvent: PropTypes.func.isRequired
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
      events
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.session.name}</h1>
        <EventClock createEvent={this.props.createEvent}
                    deleteEvent={this.props.deleteEvent}
                    session={this.state.session}
                    events={this.state.events}/>
        <IndexLink to="/">back</IndexLink>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  createEvent, deleteEvent
})(SessionDetail)
