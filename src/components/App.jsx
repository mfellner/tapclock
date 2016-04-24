import React, { Component, PropTypes } from 'react'

export default class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <h1>Tap Clock</h1>
        {this.props.children}
      </div>
    )
  }
}
