import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './input-group.scss'

class Button extends Component {
  render() {
    return (
      <span styleName="input-group-btn">
        {this.props.children}
      </span>
    )
  }
}

class InputGroup extends Component {
  static Button = CSSModules(Button, styles)

  render() {
    return (
      <div styleName="input-group">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(InputGroup, styles)
