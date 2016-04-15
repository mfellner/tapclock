import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'

import RecordView from './RecordView.jsx'
import TimeView from './TimeView.jsx'
import { TimeRecord } from '../model'

export default class RecordList extends Component {
  static propTypes = {
    records: PropTypes.instanceOf(List).isRequired
  };

  render() {
    const currentTime = new TimeRecord({time: moment()})
    return (
      <div>
        {this.props.records.map((record, i, records) => (
          <RecordView key={i} data={record}>
            <TimeView start={record} end={records.get(i + 1, currentTime)}/>
          </RecordView>
        ))}
      </div>
    )
  }
}
