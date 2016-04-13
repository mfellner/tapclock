import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'

import Record from './Record.jsx'

export default class RecordList extends Component {
  static propTypes = {
    records: PropTypes.instanceOf(List).isRequired
  };

  timeDelta(a, b) {
    const d = new Date(Math.abs(a - b))
    return `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
  }

  duration(start, stop) {
    if (!start || !stop) return null
    else return (
      <span>duration: {this.timeDelta(start.time, stop.time)}</span>
    )
  }

  render() {
    return (
      <div>
        {this.props.records.map((record, i, records) => (
          <div key={i}>
            <Record data={record}/>
            {this.duration(record, records.get(i + 1))}
          </div>
        ))}
      </div>
    )
  }
}
