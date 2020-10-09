import React, {Component} from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Register from './components/register'
import Login from './components/login'

class RouterView extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default RouterView
