import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import { Row, Col } from '../components/layout'
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
          <Col sm={12}>
            {this.props.sessions.valueSeq().map(session => (
              <Row key={session._id}>
                <Col xs={8} sm={6}>
                  <Link to={`/session/${session._id}`}>{session.name}</Link>
                </Col>
                <Col xs={4} sm={6}>
                  <button onClick={this.deleteSession.bind(this, session._id)}>delete</button>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        <Row>
          <Col xs={8} sm={6}>
            <button onClick={this.addSession.bind(this)}>add session</button>
          </Col>
          <Col xs={4} sm={6}>
            <Link to="/preferences">Preferences</Link>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  createSession, deleteSession
})(SessionList)
