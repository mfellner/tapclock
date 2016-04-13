import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'

import RecordList from './RecordList.jsx'

export default class PunchClock extends Component {
  static propTypes = {
    clock: PropTypes.instanceOf(Map).isRequired,
    punchClock: PropTypes.func.isRequired,
    clearClock: PropTypes.func.isRequired
  };

  render() {
    const {punchClock, clearClock, clock} = this.props
    const currentEvent = clock.get('currentEvent')

    const button = (event) => (
      <button onClick={punchClock.bind(this, event)}
              disabled={currentEvent === event}>{event}</button>
    )
    return (
      <div>
        <div>
          {button('work')}
          &nbsp;
          {button('break')}
          &nbsp;
          {button('stop')}
          &nbsp;
          <button onClick={clearClock}>clear</button>
        </div>
        <RecordList records={clock.get('records')}/>
      </div>
    )
  }
}
