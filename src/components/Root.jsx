import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import App from '../containers/App.jsx'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}/>
        </Router>
      </Provider>
    )
  }
}
