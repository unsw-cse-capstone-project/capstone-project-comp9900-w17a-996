import React, { Component } from 'react';
import { List, Avatar } from 'antd';
class RecommendList extends Component {
  state = { recommendmovie: [] }

  componentDidMount(){
    fetch("/recommendmovie")
      .then((r) => r.json())
      .then((r) => {
        this.setState(r);
        console.log("RecommendList:",r);
      });
  }

  handleClick = (title) => {
    
  }

  render() { 
    const data = this.state.recommendmovie;
    return ( <React.Fragment>
      <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                // avatar={<Avatar src={item.src} style={{height:'50px',width:'50px'}}/>}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.reason}
                />
            </List.Item>
            )}/>
    </React.Fragment> );
  }
}
 
export default RecommendList;