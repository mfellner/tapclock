import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './row.scss'

class Row extends Component {
  static propTypes = {
    style: PropTypes.object
  }

  static defaultProps = {
    style: null
  }

  render() {
    return (
      <div style={this.props.style} styleName="row">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(Row, styles)
