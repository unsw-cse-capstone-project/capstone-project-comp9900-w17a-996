import React, { Component } from "react";
import { BorderSearchWarp } from "../components/styledSearch";
import { Button } from "antd";
import { StyledButton } from "../components/styledButton.js";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  componentWillMount() {
    fetch("/home")
      .then((r) => r.json())
      .then((r) => {
        this.setUser(r.username);
      });
  }

  setUser(name) {
    if (name == "") {
      this.setState({ username: "Visitor" });
    } else {
      this.setState({ username: name });
    }
  }

  goLogin = () => {
    this.props.history.push("/login");
  };

  goProfile = () => {
    this.props.history.push("/profile");
  };

  goWishList = () => {
    this.props.history.push("/wishList");
  };

  handleSearch(ev, searchContent) {
    const data = {
      searchContent: searchContent
    }

    console.log(data);

    fetch("/app", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
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
      <BorderSearchWarp
        border={{
          width: "1px",
          color: "#d9e3f0",
          style: "solid",
          rodius: "10px",
        }}
      >
        <div>
          
          <StyledButton type="primary" onClick={this.goProfile}>
            Profile
          </StyledButton>
          <StyledButton type="primary">Messages</StyledButton>
          <StyledButton type="primary" onClick={this.goWishList}>
            Wishlist
          </StyledButton>
          <StyledButton type="primary">History</StyledButton>
          <StyledButton type="primary" onClick={this.goLogin}>
            Login/Register
          </StyledButton>
          <h1 className="mt-2">Hi, {this.state.username}</h1>
        </div>
        
        {/* <img src={searchImg} /> 
                <Fragment>
                Searching Movies...
                </Fragment >
                <TransButton type="primary">Search</TransButton> */}
      </BorderSearchWarp>
      <input type="text" ref="searchContent" className="col-md-3 ml-5"></input>
      <Button className="btn btn-info" onClick={(ev) => 
      this.handleSearch(
        ev,
        this.refs.searchContent.value
      )}>Search</Button>
      </React.Fragment>
    );
  }
}

export default Search;
