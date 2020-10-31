import React, { Component } from 'react';
import { List } from 'antd';

class OtherWishlist extends Component {
    state = { wishlist:[] }

    componentDidMount() {
      setTimeout(() => {
        fetch("/otherWishList")
        .then((r) => {
          console.log(r);
          return r.json();
        })
        .then((r) => {
          this.setState(r);
          console.log(r);
        });
        
      });
    }
      

    render() { 
        return ( <React.Fragment>
            <List
    itemLayout="horizontal"
    dataSource={this.state.wishlist}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta className="ml-5"
          title={<a href="https://ant.design">{item.title}</a>}
          description={item.movies}
        />
      </List.Item>
    )}
  />
        </React.Fragment> );
    }
}
 
export default OtherWishlist;