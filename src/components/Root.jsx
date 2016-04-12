import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, browserHistory } from 'react-router'

import App from '../containers/App.jsx'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.history = USE_HTML5_HISTORY ? browserHistory : hashHistory
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.history}>
          <Route path="/" component={App}/>
        </Router>
      </Provider>
    )
  }
}
