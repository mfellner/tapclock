import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import logger from '../debug'
import { Row, Cell } from '../components/layout'
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
          <Cell>
            <h1>Preferences</h1>
          </Cell>
        </Row>
        {this.props.templates.toIndexedSeq().map(template =>
          <Row key={template._id}>
            <Cell>
              {template.name}
            </Cell>
            <Cell>
              <button onClick={this.props.deleteTemplate.bind(this, template._id)}>delete</button>
            </Cell>
          </Row>
        )}
        <Row>
          <Cell>
            <input type="text"
                   value={this.state.templateName}
                   onChange={this.onTemplateNameChanged.bind(this)}/>
            <button disabled={!this.state.templateName}
                    onClick={this.onCreateTemplate.bind(this, this.state.templateName)}>
              create event template
            </button>
          </Cell>
          <Cell>
            <IndexLink to="/">back</IndexLink>
          </Cell>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, {createTemplate, deleteTemplate})(PreferencesView)
