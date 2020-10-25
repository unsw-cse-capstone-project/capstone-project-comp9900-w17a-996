<<<<<<< HEAD
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

import Dropdwon from "./components/DropDown";
import HotMovies from "./components/HotMovies";
import Carousel from "./components/Carousel";

class App extends React.Component {
=======
import React, {useState, useEffect} from 'react';
import { Button } from 'antd';
import './App.css';
import {Route, Switch, HashRouter} from 'react-router-dom';
import Search from './components/Search';

import Share from "./components/Share";
import Dropdwon from "./components/DropDown";
import HotList from "./components/HotList";

    
class App extends React.Component{
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
  constructor(props){
    super(props);
    this.state = {};
  }
<<<<<<< HEAD

=======
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
  render(){
    return(
      <HashRouter>
        <Switch>
<<<<<<< HEAD
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

          <Route path="/dropdown" component={Dropdwon}/>
          <Route path="/hotmovies" component={HotMovies}/>
          <Route path="/carousel" component={Carousel}/>
=======
          <Route component = {Search} path = "/search"/>
          <Route path="/share" component={Share}/>
          <Route path="/dropdown" component={Dropdwon}/>
          <Route path="/hotlist" component={HotList}/>
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
        </Switch>
      </HashRouter>
    )
  }
}
<<<<<<< HEAD

export default App;
=======
export default App;


>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
