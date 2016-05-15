import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router'

import App from './App.jsx'
import SessionList from '../containers/SessionList.jsx'
import PreferencesView from './../containers/PreferencesView.jsx'
import SessionDetail from './../containers/SessionDetail.jsx'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.history = USE_HTML5_HISTORY ? browserHistory : hashHistory
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.history}>
          <Route path="/" component={App}>
            <IndexRoute component={SessionList}/>
            <Route path="preferences" component={PreferencesView}/>
            <Route path="session/:id" component={SessionDetail}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}
