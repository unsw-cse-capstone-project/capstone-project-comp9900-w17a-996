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
        
      },500);
    }
      
    handleClick(title) {
      // const data = {
      //   title: title,
      // };
  
      // fetch("/movieDetail", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((response) => console.log(response))
      //   .then((data) => {
      //     console.log("Success:", data);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
  
      window.location.href = "/#/movie?title=" + title;
    }

    mapTitle = (idx) => {
      console.log(idx);
      if (idx === "0"){
        return "My Favourite";
      }
      else if (idx === "1"){
        return "Watch Later";
      }
      else if (idx === "2"){
        return "Coming Soon";
      }
      else if (idx === "3"){
        return "Popular";
      }
      else if (idx === "4"){
        return "Classic";
      }
      else if (idx === "5"){
        return "Cure";
      }
      else if (idx === "6"){
        return "Serious";
      }
      else if (idx === "7"){
        return "Family";
      }
      else if (idx === "8"){
        return "Technology";
      }
      else {
        return "Education";
      }
    }

    render() { 
      
        return ( <React.Fragment>
            <List
    itemLayout="horizontal"
    dataSource={this.state.wishlist}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta className="ml-5"
          title={<a >{this.mapTitle(item.title)}</a>}
    description={<List dataSource={item.movies} renderItem={item => (<List.Item onClick={() => this.handleClick(item)}>{item}</List.Item>)}></List>}
        />
      </List.Item>
    )}
  />
        </React.Fragment> );
    }
}
 
export default OtherWishlist;