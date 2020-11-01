import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

class MyFollower extends Component {
    state = {  }
    render() { 
        return ( <React.Fragment>
            <NavBar />
            <div className="row col-md-12">
        <div className="col-md-2"><SideBar ckey="2"/></div>
          
          <div className="col-md-9">
            <h3>Should be MyFollower list</h3>
          </div>
          </div>
        </React.Fragment> );
    }
}
 
export default MyFollower;