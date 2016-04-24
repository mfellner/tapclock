import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import { createSession, deleteSession } from '../actions/sessions'

function mapStateToProps(state) {
  return {
    sessions: state.get('sessions'),
    events: state.get('events'),
  }
}

export default class SessionList extends Component {
  static propTypes = {
    sessions: PropTypes.instanceOf(Map).isRequired,
    events: PropTypes.instanceOf(Map).isRequired,
    createSession: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired
  }

  addSession() {
    this.props.createSession('Session ' + Date.now())
  }

  deleteSession(session_id) {
    this.props.deleteSession(session_id)
  }

  render() {
    return (
      <div>
        {this.props.sessions.valueSeq().map(session => (
          <div key={session._id}>
            <Link to={`/session/${session._id}`}>{session.name}</Link>
            &nbsp;
            <button onClick={this.deleteSession.bind(this, session._id)}>delete</button>
          </div>
        ))}
        <div>
          <button onClick={this.addSession.bind(this)}>add session</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  createSession, deleteSession
})(SessionList)
