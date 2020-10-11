import React, { Component, useState, useEffect } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./routes/register.js";
import Login from "./routes/login.js";
import Profile from "./routes/profile.js";

class App extends Component {
  state = {  }

  render() { 
    return ( <Router>
      
      <div>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router> );
  }
}
 
export default App;
