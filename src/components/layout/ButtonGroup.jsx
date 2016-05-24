import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './button-group.scss'

function getStyleName(props) {
  let style = 'btn-group'
  if (props.margin) style += ` m-a-${props.margin}`
  if (props.marginTop) style += ` m-t-${props.marginTop}`
  if (props.marginRight) style += ` m-r-${props.marginRight}`
  if (props.marginBottom) style += ` m-b-${props.marginBottom}`
  if (props.marginLeft) style += ` m-l-${props.marginLeft}`
  return style
}

class ButtonGroup extends Component {
  static propTypes = {
    margin: PropTypes.number,
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      styleName: getStyleName(props)
    }
  }

  render() {
    return (
      <div styleName={this.state.styleName} role="group">
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(ButtonGroup, styles, {allowMultiple: true})
