import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { Map } from 'immutable'
import { connect } from 'react-redux'

import logger from '../debug'
import EventClock from './../components/EventClock.jsx'
import { punchClock, clearClock } from '../actions/events'

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
    punchClock: PropTypes.func.isRequired,
    clearClock: PropTypes.func.isRequired
  }

  componentWillMount() {
    log('component will mount %o', this.props)
    this.setSession(this.props)
  }

  componentWillReceiveProps(props) {
    log('component will receive props %o', props)
    this.setSession(props)
  }

  setSession(props) {
    const session = props.sessions.get(props.routeParams.id)
    log('setSession %o', session)

    const events = props.events.filter(e => e.session_id === session._id)
                        .sortBy(e => e.time)
    log('setSession events %o', events)

    this.setState({
      session,
      events
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.session.name}</h1>
        <EventClock punchClock={this.props.punchClock}
                    clearClock={this.props.clearClock}
                    session={this.state.session}
                    events={this.state.events}/>
        <IndexLink to="/">back</IndexLink>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  punchClock, clearClock
})(SessionDetail)
