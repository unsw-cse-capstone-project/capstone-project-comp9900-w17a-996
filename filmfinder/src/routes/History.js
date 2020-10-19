import React, { Component } from 'react';
import Navbar from '../components/NavBar'

class History extends Component {
    state = {  }

    render() { 
        return ( <React.Fragment>
            <Navbar/>
            <h1>My Review History</h1>
        </React.Fragment> );
    }
}
 
export default History;