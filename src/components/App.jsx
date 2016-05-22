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
    console.log(this.props)
    return (
      <Container>
        <h1>
          Tap Clock&nbsp;
          <small style={{fontSize: '0.5em'}}>{this.props.location.pathname}</small>
        </h1>
        {this.props.children}
      </Container>
    )
  }
}
