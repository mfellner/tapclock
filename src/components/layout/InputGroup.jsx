import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './input-group.scss'

function getStyleName(props) {
  let style = 'input-group'
  if (props.margin) style += ` m-a-${props.margin}`
  if (props.marginTop) style += ` m-t-${props.marginTop}`
  if (props.marginRight) style += ` m-r-${props.marginRight}`
  if (props.marginBottom) style += ` m-b-${props.marginBottom}`
  if (props.marginLeft) style += ` m-l-${props.marginLeft}`
  return style
}

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
  static propTypes = {
    margin: PropTypes.number,
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number
  }

  static Button = CSSModules(Button, styles)

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

export default CSSModules(InputGroup, styles, {allowMultiple: true})
