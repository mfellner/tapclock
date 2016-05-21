import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './row.scss'

class Row extends Component {
  render() {
    return (
      <div styleName="row">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(Row, styles)
