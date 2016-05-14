import React, { Component, PropTypes } from 'react'
import { Container } from './layout'

export default class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <Container>
        <h1>Tap Clock</h1>
        {this.props.children}
      </Container>
    )
  }
}