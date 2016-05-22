import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './table.scss'

function getStyleName(props) {
  let style = 'table'
  if (props.small) style += ' table-sm'
  if (props.striped) style += ' table-striped'
  if (props.reflow) style += ' table-reflow'
  return style
}

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      styleName: getStyleName(props)
    }
  }

  static propTypes = {
    small: PropTypes.bool.isRequired,
    striped: PropTypes.bool.isRequired,
    responsive: PropTypes.bool.isRequired,
    reflow: PropTypes.bool.isRequired
  }

  static defaultProps = {
    small: false,
    striped: false,
    responsive: false,
    reflow: false
  }

  renderTableResponsive() {
    return (
      <div styleName="table-responsive">
        <table styleName={this.state.styleName}>
          {this.props.children}
        </table>
      </div>)
  }

  renderTable() {
    return (
      <table styleName={this.state.styleName}>
        {this.props.children}
      </table>)
  }

  render() {
    return this.props.responsive
      ? this.renderTableResponsive()
      : this.renderTable()
  }
}

export default CSSModules(Table, styles, {allowMultiple: true})
