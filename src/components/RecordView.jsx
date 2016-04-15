import React, { Component, PropTypes } from 'react'
import { TimeRecord } from '../model'

export default class RecordView extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(TimeRecord).isRequired
  };

  render() {
    return (
      <div>
        <span>{this.props.data.event}&nbsp;</span>
        <span>{this.props.data.time.calendar()}</span>
        {this.props.children}
      </div>
    )
  }
}
