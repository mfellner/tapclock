import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { punchClock, clearClock } from '../actions/clock'

function mapStateToProps(state) {
  return {
    time: state.time
  }
}

class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    time: PropTypes.object.isRequired,
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
    const {time} = this.props
    return (
      <div className="container">
        <h1>Hello, tapclock!</h1>
        <div>
          <button onClick={this.onPunch.bind(this)}>punch</button>
          <button onClick={this.onClear.bind(this)}>clear</button>
        </div>
        <h4>Records:</h4>
        <div>
          {time.records.map((record, i) => (
            <div key={i}>{record.toLocaleString()}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  punchClock, clearClock
})(App)
