import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './container.scss'

function getStyleName(props) {
  let style = 'container'
  if (props.fluid) style += '-fluid'
  return style
}

class Container extends Component {
  static propTypes = {
    fluid: PropTypes.bool.isRequired
  }

  static defaultProps = {
    fluid: false
  }

  constructor(props) {
    super(props)
    this.state = {
      styleName: getStyleName(props)
    }
  }

  render() {
    return (
      <div styleName={this.state.styleName}>
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(Container, styles)
