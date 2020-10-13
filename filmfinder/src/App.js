import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import './App.css';
import MovieDetail from './routes/MovieDetail';
import WishList from './routes/WishList';
import Register from "./routes/register.js";
import Login from "./routes/login.js";
import Profile from "./routes/profile.js";
import Home from "./routes/Home";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route component={MovieDetail} path="/movie"/>
          <Route component={WishList} path="/wishList"/>
          <Route component={Home} path="/home"/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;