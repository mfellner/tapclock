import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import { Row, Cell } from '../components/layout'
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
        <Row>
          <Cell>
            {this.props.sessions.valueSeq().map(session => (
              <Row key={session._id}>
                <Cell>
                  <Link to={`/session/${session._id}`}>{session.name}</Link>
                </Cell>
                <Cell>
                  <button onClick={this.deleteSession.bind(this, session._id)}>delete</button>
                </Cell>
              </Row>
            ))}
          </Cell>
        </Row>
        <Row>
          <Cell>
            <button onClick={this.addSession.bind(this)}>add session</button>
          </Cell>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  createSession, deleteSession
})(SessionList)
