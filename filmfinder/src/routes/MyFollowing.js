import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { List } from 'antd';

class MyFollowing extends Component {
    state = { followings: [{'user': 'hi'}, {'user': 'ho'}] }



    render() { 
        return ( <React.Fragment>
            <NavBar />
            <div className="row col-md-12">
        <div className="col-md-2"><SideBar ckey="3"/></div>
          
          <div className="col-md-9">
            
          <List
    itemLayout="horizontal"
    dataSource={this.state.followings}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta className="ml-5"
          title={<a href="https://ant.design">{item.user}</a>}
          // description={item.}
        />
        <button>Unfollow</button>
      </List.Item>
    )}
  />

          </div>
          </div>
        </React.Fragment> );
    }
}
 
export default MyFollowing;