import React, {Component} from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Register from './components/register'
import Login from './components/login'
import Profile from './components/profile'

class RouterView extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default RouterView
