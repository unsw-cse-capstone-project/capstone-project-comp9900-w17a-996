import React, { Component } from "react";
import { BorderSearchWarp } from "../components/styledSearch";
import { Button } from "antd";
import { StyledButton } from "../components/styledButton.js";
import "../styles/centerCenter.css";
import SearchBar from "../components/Search";
import HotMovies from "../components/HotMovies";
import Carousel from "../components/Carousel";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      hotMovies: [],
    };
  }

  componentDidMount() {
    fetch("/home")
      .then((r) => r.json())
      .then((r) => {
        this.setUser(r.username);
      });
  }

  setUser(name) {
    if (name === "") {
      this.setState({ username: "Visitor" });
    } else {
      this.setState({ username: name });
    }
  }

  displayUser = (name) => {
    if (name === "Visitor") {
      return "Hello visitor, please sign in."
    }
    else {
      return "Signed in as " + name;
    }
  }

  goLogin = () => {
    this.props.history.push("/login");
  };

  goProfile = () => {
    this.props.history.push("/profile");
  };

  goMessage = () => {
    console.log(this.state);
  };

  goWishList = () => {
    this.props.history.push("/wishList");
  };

  goHistory = () => {
    this.props.history.push("/history");
  };

  handleSearch(ev, searchContent) {
    const data = {
      searchContent: searchContent,
    };

    console.log(data);

    fetch("/search", {
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

    this.props.history.push("/result");
  }

  render() {
    return (
      <React.Fragment>
        <nav className="site-header sticky-top py-1">
          <div className="container d-flex flex-column flex-md-row justify-content-between">
            {/* <a className="py-2" aria-label="Product">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#010d20fb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="d-block mx-auto" role="img" viewBox="0 0 24 24" focusable="false"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
    </a> */}
            <a className="py-2 text-muted">FilmFinder&copy; </a>
            <a className="py-2 d-none d-md-inline-block" href="#/profile">
              Profile
            </a>
            <a className="py-2 d-none d-md-inline-block">Messages</a>
            <a className="py-2 d-none d-md-inline-block" href="#/wishList">
              Wishlist
            </a>
            <a className="py-2 d-none d-md-inline-block" href="#/history">
              History
            </a>
            <a className="py-2 d-none d-md-inline-block" href="#/login">
              Login/Register
            </a>
            {/* <a className="py-2 d-none d-md-inline-block" href="#">Pricing</a>
    <a className="py-2 d-none d-md-inline-block" href="#">Cart</a> */}
          </div>
        </nav>
        <div className="box_id mr-5">
          <h5>{this.displayUser(this.state.username)}</h5>
        </div>

        {/* <div> */}

        {/* <BorderSearchWarp
          border={{
            width: "1px",
            color: "#d9e3f0",
            style: "solid",
            rodius: "10px",
          }}
        >
        
          <button type="button" className="btn btn-outline-info" onClick={this.goProfile}>
            Profile
          </button>
          <Button type="primary" onClick={this.goMessage}>
            Messages
          </Button>
          <Button type="primary" onClick={this.goWishList}>
            Wishlist
          </Button>
          <Button type="primary" onClick={this.goHistory}>
            History
          </Button>
          <Button type="primary" onClick={this.goLogin}>
            Login/Register
          </Button>
          
        
        </BorderSearchWarp> */}
        {/* </div> */}

        <div className="box_search">
          <SearchBar />
        </div>
        <br />
        <br />
        <br />

        <div>
          <Carousel />
        </div>
        <div className="box_search">
          <HotMovies />

          {/* <input type="text" ref="searchContent" className=""></input>
          <Button
            className="btn btn-info"
            onClick={(ev) =>
              this.handleSearch(ev, this.refs.searchContent.value)
            }
          >
            Search
          </Button> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
