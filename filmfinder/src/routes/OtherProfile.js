import React, { Component } from "react";
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

  componentDidMount() {
    const query = this.props.location.search;
    const username = query.split("=")[1];

    fetch("/followUser")
      .then((r) => r.json())
      .then((r) => {
        this.setState({
          follow: this.setStatus(r.isfollower)
        });
        console.log("Follow state:", r);
      });

    fetch("/blockUser")
      .then((r) => r.json())
      .then((r) => {
        this.setState({
          follow: this.setStatus(r.isblocker)
        });
        console.log("Block state:", r);
      });

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

    this.setState({
      userName: username,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="center-h">
          <h3>This is the profile page of {this.state.userName}</h3>
        </div>
        <div className="row center-h">
          <FollowButton follow={this.state.follow} username={this.state.userName} />
          
          <BlockButton block={this.state.block} username={this.state.userName} />
        </div>

        <OtherReview />
        <OtherWishlist />
      </React.Fragment>
    );
  }
}

export default OtherProfile;
