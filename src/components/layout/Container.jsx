import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './container.scss'

class Container extends Component {
  render() {
    return (
      <div styleName="container-fluid">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(Container, styles)
