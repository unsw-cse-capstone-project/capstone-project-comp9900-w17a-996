import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { List } from 'antd';

class MyBlock extends Component {
    state = { blocks: [] }

    componentDidMount() {
      fetch("/blocklist")
      .then((r) => r.json())
      .then((r) => {
        
        console.log("BL:",r);
        this.setState(r);
      });
    }

    handleUnblock(blocker){
      console.log(blocker);
      const data = {action: "u", user: blocker};

      fetch("/blockUser", {
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
          fetch("/blocklist")
      .then((r) => r.json())
      .then((r) => {
        
        console.log("BL:",r);
        this.setState(r);
      });
        }, 500)
    }

    render() { 
        return ( <React.Fragment>
            <NavBar />
            <div className="row col-md-12">
        <div className="col-md-2"><SideBar ckey="4"/></div>
          
          <div className="col-md-9">
            
          <List
    itemLayout="horizontal"
    dataSource={this.state.blocks}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta className="ml-5"
          title={<a href="https://ant.design">{item.user}</a>}
          // description={item.}
        />
        <button onClick={() => (this.handleUnblock(item.user))}>Unblock</button>
      </List.Item>
    )}
  />

          </div>
          </div>
        </React.Fragment> );
    }
}
 
export default MyBlock;