import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import { connect } from 'react-redux'

import { punchClock, clearClock } from '../actions/clock'

function mapStateToProps(state) {
  return {
    records: state.records
  }
}

class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    records: PropTypes.instanceOf(List).isRequired,
    punchClock: PropTypes.func.isRequired,
    clearClock: PropTypes.func.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  onPunch() {
    this.props.punchClock()
  }

  onClear() {
    this.props.clearClock()
  }

  render() {
    const {records} = this.props
    return (
      <div className="container">
        <h1>Hello, tapclock!</h1>
        <div>
          <button onClick={this.onPunch.bind(this)}>punch</button>
          <button onClick={this.onClear.bind(this)}>clear</button>
        </div>
        <h4>Records:</h4>
        <div>
          {records.map((record, i) => (
            <div key={i}>{record.time.toLocaleString()}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  punchClock, clearClock
})(App)
