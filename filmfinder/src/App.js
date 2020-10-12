import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import './App.css';
import MovieDetial from './routes/MovieDetail';
import WishList from './routes/WishList';
import Register from "./routes/register.js";
import Login from "./routes/login.js";
import Profile from "./routes/profile.js";
import Search from "./routes/Search";

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
          <Route component={MovieDetial} path="/movie"/>
          <Route component={WishList} path="/wishList"/>
          <Route component={Search} path="/search"/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;