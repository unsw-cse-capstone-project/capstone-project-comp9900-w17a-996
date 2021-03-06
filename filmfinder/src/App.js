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
import OtherProfile from "./routes/OtherProfile.js";

import MyFollower from "./routes/MyFollower.js";
import MyFollowing from "./routes/MyFollowing.js";
import MyBlock from "./routes/MyBlock.js";

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

          <Route component={Result} path="/result"/>
          <Route path="/history" component={History} />
          <Route path="/register.success=True" component={RegisterSuccess}/>
          <Route path="/register.success=False" component={RegisterFail}/>

          <Route path="/dropdown" component={Dropdwon}/>
          <Route path="/hotmovies" component={HotMovies}/>
          <Route path="/carousel" component={Carousel}/>
          <Route path="/otherProfile" component={OtherProfile}/>

          <Route path="/myFollower" component={MyFollower}/>
          <Route path="/myFollowing" component={MyFollowing}/>
          <Route path="/myBlock" component={MyBlock}/>
          <Route component={Home} path=""/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;