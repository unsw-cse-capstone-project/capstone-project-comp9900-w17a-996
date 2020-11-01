import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { List } from 'antd';

class MyBlock extends Component {
    state = { blocks: [{'user': 'hi'}, {'user': 'ho'}] }

    componentDidMount() {
      fetch("/blocklist")
      .then((r) => r.json())
      .then((r) => {
        
        console.log("BL:",r);
      });
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
        <button>Unblock</button>
      </List.Item>
    )}
  />

          </div>
          </div>
        </React.Fragment> );
    }
}
 
export default MyBlock;