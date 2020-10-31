import React, { Component } from 'react';
import { List } from 'antd';

class OtherWishlist extends Component {
    state = { titles: [
        {
            title: 'Ant Design Title 1',
          },
          {
            title: 'Ant Design Title 2',
          },
          {
            title: 'Ant Design Title 3',
          },
          {
            title: 'Ant Design Title 4',
          },
    ] }

    componentDidMount() {
      fetch("/otherWishList")
        .then((r) => {
          console.log(r);
          return r.json();
        })
        .then((r) => {
          this.setState(r);
          console.log(r);
        });
        
      }

    render() { 
        return ( <React.Fragment>
            <List
    itemLayout="horizontal"
    dataSource={this.state.titles}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
        </React.Fragment> );
    }
}
 
export default OtherWishlist;