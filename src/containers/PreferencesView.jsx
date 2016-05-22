import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import logger from '../debug'
import { Row, Col, Button } from '../components/layout'
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
        {this.props.templates.toIndexedSeq().map(template =>
          <Row key={template._id}>
            <Col xs={4} sm={4}>
              {template.name}
            </Col>
            <Col xs={2} sm={2}>
              <Button bsSize="sm" onClick={this.props.deleteTemplate.bind(this, template._id)}>delete</Button>
            </Col>
          </Row>
        )}
        <Row>
          <Col sm={12}>
            <input type="text"
                   value={this.state.templateName}
                   onChange={this.onTemplateNameChanged.bind(this)}/>
            <Button bsSize="sm"
                    disabled={!this.state.templateName}
                    onClick={this.onCreateTemplate.bind(this, this.state.templateName)}>
              create event template
            </Button>
            <Button bsSize="sm" to="/">back</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {createTemplate, deleteTemplate})(PreferencesView)
