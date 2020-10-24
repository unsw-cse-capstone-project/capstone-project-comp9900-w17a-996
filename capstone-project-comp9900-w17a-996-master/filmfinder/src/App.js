import React, {useState, useEffect} from 'react';
import { Button } from 'antd';
import './App.css';
import {Route, Switch, HashRouter} from 'react-router-dom';
import Search from './components/Search';

import Share from "./components/Share";
import Dropdwon from "./components/DropDown";
import HotList from "./components/HotList";

    
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route component = {Search} path = "/search"/>
          <Route path="/share" component={Share}/>
          <Route path="/dropdown" component={Dropdwon}/>
          <Route path="/hotlist" component={HotList}/>
        </Switch>
      </HashRouter>
    )
  }
}
export default App;


