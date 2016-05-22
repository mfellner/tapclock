import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import { Row, Col, Button, ListGroup, ListGroupItem } from '../components/layout'
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
          <Col xs={12} sm={12}>
            <ListGroup>
              {this.props.sessions.valueSeq().map(session => (
                <ListGroupItem key={session._id}
                               lineHeight="31px">
                  <Link to={`/session/${session._id}`}>{session.name}</Link>
                  <Button bsSize="sm"
                          pullRight="xs"
                          onClick={this.deleteSession.bind(this, session._id)}>delete</Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <Button bsSize="sm" onClick={this.addSession.bind(this)}>add session</Button>
            <Button bsSize="sm" to="/preferences">Preferences</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  createSession, deleteSession
})(SessionList)
