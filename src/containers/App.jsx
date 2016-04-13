import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'

import PunchClock from '../components/PunchClock.jsx'
import { punchClock, clearClock } from '../actions/clock'

function mapStateToProps(state) {
  return {
    clock: state.get('clock')
  }
}

class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    clock: PropTypes.instanceOf(Map).isRequired,
    punchClock: PropTypes.func.isRequired,
    clearClock: PropTypes.func.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <h1>Tap Clock</h1>
        <PunchClock {...this.props}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  punchClock, clearClock
})(App)
