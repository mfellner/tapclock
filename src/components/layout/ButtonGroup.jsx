import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './button-group.scss'

class ButtonGroup extends Component {
  render() {
    return (
      <div styleName="btn-group" role="group">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(ButtonGroup, styles)
