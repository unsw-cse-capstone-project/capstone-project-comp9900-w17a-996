import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { List } from 'antd';

class MyFollower extends Component {
    state = { followers: [] }

    componentDidMount() {
      fetch("/showFollowers")
      .then((r) => r.json())
      .then((r) => {
        
        console.log("FGL:",r);
        this.setState(r);
      });
    }

    handleUser(user){
      window.location.href = "/#/otherProfile?username=" + user;
    }

    render() { 
        return ( <React.Fragment>
            <NavBar />
            <div className="row col-md-12">
        <div className="col-md-2"><SideBar ckey="2"/></div>
          
        <div className="col-md-9">
            
            <List
      itemLayout="horizontal"
      dataSource={this.state.followers}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta className="ml-5"
            title={<a onClick={() => this.handleUser(item.user)}>{item.user}</a>}
            // description={item.}
          />
          
        </List.Item>
      )}
    />
  
            </div>
          </div>
        </React.Fragment> );
    }
}
 
export default MyFollower;