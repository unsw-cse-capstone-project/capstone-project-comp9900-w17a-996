import React, { Component } from 'react';
import { Menu, Button } from "antd";

class SideBar extends Component {
    constructor(props) {
        super(props);
      }

    state = {  }

    goProfile = () => {
        window.location.href = "/#/profile";
    }

    goFollower = () => {
        window.location.href = "/#/myFollower";
    }

    goFollowing = () => {
        window.location.href = "/#/myFollowing";
    }

    goBlock = () => {
        window.location.href = "/#/myBlock";
    }

    render() { 
        
        let selectedKey = this.props.ckey;
        let openedKey = "sub" + selectedKey;
        return ( <React.Fragment>
           <div className="mt-5">
           <Menu mode="inline" defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={[openedKey]} theme="light">
          <Menu.Item key="1" onClick={this.goProfile.bind(this)}>
            Manage Account
          </Menu.Item>
          <Menu.Item key="2" onClick={this.goFollower.bind(this)}>
            My Followers
          </Menu.Item>
          <Menu.Item key="3" onClick={this.goFollowing.bind(this)} >
            My Followings
          </Menu.Item>
          <Menu.Item key="4" onClick={this.goBlock.bind(this)}>
            My Blocklist
          </Menu.Item>
        </Menu>
        </div> 
          
          
        </React.Fragment> );
    }
}
 
export default SideBar;