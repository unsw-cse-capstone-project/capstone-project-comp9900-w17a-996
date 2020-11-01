import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
class MyFollowing extends Component {
    state = {  }
    render() { 
        return ( <React.Fragment>
            <NavBar />
            <div className="row col-md-12">
        <div className="col-md-2"><SideBar ckey="3"/></div>
          
          <div className="col-md-9">
            <h3>Should be MyFollowing list</h3>
          </div>
          </div>
        </React.Fragment> );
    }
}
 
export default MyFollowing;