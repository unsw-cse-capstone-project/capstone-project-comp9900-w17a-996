<<<<<<< HEAD
import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';

import './App.css';
import MovieDetial from './routes/MovieDetail';
import WishList from './routes/WishList';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route component={MovieDetial} path="/movie"/>
          <Route component={WishList} path="/wishList"/>
        </Switch>
      </HashRouter>
    )
  }
  /*const [initialData, setInitialData] = useState([{}])

  useEffect(() => {
    fetch('/app').then(
      response => response.json()
    ).then(data => setInitialData(data))
  });
  return (
    <div className="App">
      <h1>{initialData.title}</h1>
      <br/>
      <h2>{initialData.message}</h2>
    </div>
  );*/
=======
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
>>>>>>> f3f0494ba8bda12ca980a54487fd9c89a86d70cd
}
 
export default App;
