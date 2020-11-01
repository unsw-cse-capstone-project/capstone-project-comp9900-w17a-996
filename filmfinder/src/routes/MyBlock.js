import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

class MyBlock extends Component {
    state = {  }
    render() { 
        return ( <React.Fragment>
            <NavBar />
            <div className="row col-md-12">
        <div className="col-md-2"><SideBar ckey="4"/></div>
          
          <div className="col-md-9">
            <h3>Should be MyBlock list</h3>
          </div>
          </div>
        </React.Fragment> );
    }
}
 
export default MyBlock;