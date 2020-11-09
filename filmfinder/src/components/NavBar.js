import React, { Component } from "react";
import Search from "./Search";
import "../styles/centerCenter.css";
import Filter from "./Filter";

class NavBar extends Component {
  state = {};

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
    if (name === "") {
      this.setState({ username: "Visitor" });
    } else {
      this.setState({ username: name });
    }
  }

  setPare = () => {
    try {
      this.props.setPare();
    } catch (error) {
      ;
    }
    
  }

  render() {
    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand">FilmFinder</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#/home">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/wishList">
                  Wishlist
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/history">
                  History
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Messages
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">
                    Replied to Me
                  </a>
                  <a class="dropdown-item" href="#">
                    Thumbed me up
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">
                    My Followings
                  </a>
                  <a class="dropdown-item" href="#">
                    New Followers
                  </a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link active" tabindex="-1" aria-disabled="true">
                  G' day, {this.state.username}!
                </a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <Search setPare={this.setPare}></Search>
            </form>
            <Filter />
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
