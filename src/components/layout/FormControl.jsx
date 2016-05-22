import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './input-group.scss'

class FormControl extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: null,
    placeholder: null,
    onChange: null
  }

  render() {
    return (
      <input styleName="form-control"
             type={this.props.type}
             value={this.props.value}
             placeholder={this.props.placeholder}
             onChange={this.props.onChange}/>
    )
  }
}

export default CSSModules(FormControl, styles)
