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
        <h5 style={{marginTop: '16px', marginBottom: '16px'}}>
          Tap Clock&nbsp;
          <small style={{fontSize: '0.52em'}}>{this.props.location.pathname}</small>
        </h5>
        {this.props.children}
      </Container>
    )
  }
}
