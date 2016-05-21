import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import logger from '../../debug'
import styles from './col.scss'

const log = logger('layout:Col')

function getStyleName(props) {
  return Object.keys(props)
               .filter(key => ['xs', 'sm', 'md', 'lg', 'xl'].includes(key))
               .map(key => `col-${key}-${props[key]}`)
               .join(' ')
}

class Col extends Component {
  static propTypes = {
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      styleName: getStyleName(props)
    }
  }

  componentDidMount() {
    if (!this.state.styleName) {
      log('No style name set!')
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

export default CSSModules(Col, styles, {allowMultiple: true})
