import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import './App.css';
import MovieDetail from './routes/MovieDetail';
import WishList from './routes/WishList';
import Register from "./routes/register.js";
import Login from "./routes/login.js";
import Profile from "./routes/profile.js";
import Home from "./routes/Home";
import Result from "./routes/result";
import History from './routes/History.js';
import RegisterSuccess from "./routes/registerSuccess.js";
import RegisterFail from "./routes/registerFail.js";

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
          <Route component={Result} path="/result"/>
          <Route path="/history" component={History} />
          <Route path="/register.success=True" component={RegisterSuccess}/>
          <Route path="/register.success=False" component={RegisterFail}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;