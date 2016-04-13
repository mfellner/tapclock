import React, { Component, PropTypes } from 'react'
import { Record as IRecord } from 'immutable'

export default class Record extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(IRecord).isRequired
  };

  render() {
    return (
      <div>
        <span>{this.props.data.event}&nbsp;</span>
        <span>{this.props.data.time.toLocaleString()}</span>
      </div>
    )
  }
}
