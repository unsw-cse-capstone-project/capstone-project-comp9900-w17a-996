import React, {useState, useEffect} from 'react';
import { Button } from 'antd';
import './App.css';
import {Route, Switch, HashRouter} from 'react-router-dom';
import Search from './components/Search';
    
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
        </Switch>
      </HashRouter>
    )
  }
}
export default App;


