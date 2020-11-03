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
      
    handleClick(title) {
      const data = {
        title: title,
      };
  
      fetch("/movieDetail", {
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
  
      window.location.href = "/#/movie?title=" + title;
    }

    render() { 
      
        return ( <React.Fragment>
            <List
    itemLayout="horizontal"
    dataSource={this.state.wishlist}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta className="ml-5"
          title={<a >{item.title}</a>}
    description={<List dataSource={item.movies} renderItem={item => (<List.Item onClick={() => this.handleClick(item)}>{item}</List.Item>)}></List>}
        />
      </List.Item>
    )}
  />
        </React.Fragment> );
    }
}
 
export default OtherWishlist;