import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { List } from 'antd';

class MyFollowing extends Component {
    state = { followings: [{'user': 'hi'}, {'user': 'ho'}] }

    componentDidMount() {
      fetch("/followinglist")
      .then((r) => r.json())
      .then((r) => {
        
        console.log("FGL:",r);
        this.setState(r);
      });
    }

    handleUnfollow(following){
      console.log(following);

      const data = { action: "u", user: following };

      fetch("/followUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => console.log(response))
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

        setTimeout(() => {
          fetch("/followinglist")
      .then((r) => r.json())
      .then((r) => {
        
        console.log("FGL:",r);
        this.setState(r);
      });
        }, 500)
    }

    handleUser(user){
      window.location.href = "/#/otherProfile?username=" + user;
    }

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
          title={<a onClick={() => this.handleUser(item.user)}>{item.user}</a>}
          // description={item.}
        />
        <button onClick={() => (this.handleUnfollow(item.user))}>Unfollow</button>
      </List.Item>
    )}
  />

          </div>
          </div>
        </React.Fragment> );
    }
}
 
export default MyFollowing;