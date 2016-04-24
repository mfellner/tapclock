import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './container.css'

class Container extends Component {
  render() {
    return (
      <div styleName="container">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(Container, styles)
