import React, { Component } from "react";
import NavBar from "../components/NavBar";
import FollowButton from "../components/FollowButton";
import BlockButton from "../components/BlockButton";
import OtherReview from "../components/OtherReview";
import OtherWishlist from "../components/OtherWishlist";
import "../styles/centerCenter.css";

class OtherProfile extends Component {
  state = { userName: "", follow: "", block: "" };

  setStatus(plain_state){
    if (plain_state === "false") {
      return "";
    }
    else{
      return "1";
    }
  }

  componentWillMount() {
    const query = this.props.location.search;
    const username = query.split("=")[1];
    let followState = undefined;
    let blockState = undefined;

  
    // fetch("/followUser")
    //   .then((r) => r.json())
    //   .then((r) => {
        
    //     console.log("Follow state:", r);
    //     if (r.isfollower) {
    //       followState = '1';
    //     }
    //   });
    
    //   console.log(this.state.follow);

    // fetch("/blockUser")
    //   .then((r) => r.json())
    //   .then((r) => {

    //     console.log("Block state:", r);
    //     if (r.isblocker) {
    //       blockState = '1';
    //     }
    //   });

      setTimeout(() => {
        console.log(followState, blockState);
        this.setState({
          userName: username,
          follow: followState,
          block: blockState,
        });
        console.log("Father Data: ",this.state);
      }, 500);

    let data = { otherName: username };

    fetch("/otherReview", {
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

    fetch("/otherWishList", {
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
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="center-h">
          <h3>This is the profile page of {this.state.userName}</h3>
        </div>
        <div className="row center-h">
          <FollowButton{...this.state} />
          
          <BlockButton block={this.state.block} username={this.state.userName} />
        </div>

        <OtherReview />
        <OtherWishlist />
      </React.Fragment>
    );
  }
}

export default OtherProfile;
