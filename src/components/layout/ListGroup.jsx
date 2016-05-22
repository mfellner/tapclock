import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './list-group.scss'

class ListGroup extends Component {
  render() {
    return (
      <ul styleName="list-group">
        {this.props.children}
      </ul>
    )
  }
}

export default CSSModules(ListGroup, styles)
