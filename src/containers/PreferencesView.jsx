import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import logger from '../debug'
import { Row, Col, Button, ListGroup, ListGroupItem, Variables } from '../components/layout'
import { createTemplate, deleteTemplate } from '../actions/templates'
import { clearStore } from '../actions/store'

const log = logger('PreferencesView')

function mapStateToProps(state) {
  return {
    templates: state.get('templates')
  }
}

export default class PreferencesView extends Component {
  static propTypes = {
    templates: PropTypes.instanceOf(Map).isRequired,
    createTemplate: PropTypes.func.isRequired,
    deleteTemplate: PropTypes.func.isRequired,
    clearStore: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {templateName: ''}
  }

  onTemplateNameChanged(e) {
    this.setState({templateName: e.target.value})
  }

  onCreateTemplate(name) {
    this.setState({templateName: ''})
    this.props.createTemplate(name)
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} sm={12}>
            <ListGroup>
              {this.props.templates.toIndexedSeq().map(template =>
                <ListGroupItem key={template._id} lineHeight={Variables.BTN_HEIGHT}>
                  {template.name}
                  <Button pullRight="xs"
                          onClick={this.props.deleteTemplate.bind(this, template._id)}>delete</Button>
                </ListGroupItem>
              )}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <input type="text"
                   value={this.state.templateName}
                   onChange={this.onTemplateNameChanged.bind(this)}/>
            <Button disabled={!this.state.templateName}
                    onClick={this.onCreateTemplate.bind(this, this.state.templateName)}>
              create event template
            </Button>
            <Button bsStyle="danger"
                    onClick={this.props.clearStore}>
              clear store
            </Button>
            <Button to="/">back</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {createTemplate, deleteTemplate, clearStore})(PreferencesView)
