import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import logger from '../debug'
import { Row, Col } from '../components/layout'
import { createTemplate, deleteTemplate } from '../actions/templates'

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
    deleteTemplate: PropTypes.func.isRequired
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
            <h1>Preferences</h1>
          </Col>
        </Row>
        {this.props.templates.toIndexedSeq().map(template =>
          <Row key={template._id}>
            <Col xs={4} sm={4}>
              {template.name}
            </Col>
            <Col xs={2} sm={2}>
              <button onClick={this.props.deleteTemplate.bind(this, template._id)}>delete</button>
            </Col>
          </Row>
        )}
        <Row>
          <Col sm={8}>
            <input type="text"
                   value={this.state.templateName}
                   onChange={this.onTemplateNameChanged.bind(this)}/>
            <button disabled={!this.state.templateName}
                    onClick={this.onCreateTemplate.bind(this, this.state.templateName)}>
              create event template
            </button>
          </Col>
          <Col sm={4}>
            <IndexLink to="/">back</IndexLink>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {createTemplate, deleteTemplate})(PreferencesView)
