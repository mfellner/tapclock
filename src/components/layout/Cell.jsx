import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './cell.css'

class Cell extends Component {
  render() {
    return (
      <div styleName="cell">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(Cell, styles)
