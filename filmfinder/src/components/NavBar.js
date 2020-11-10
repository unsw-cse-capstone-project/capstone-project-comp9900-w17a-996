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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand">FilmFinder</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#/home">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/wishList">
                  Wishlist
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/history">
                  History
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Messages
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Replied to Me
                  </a>
                  <a className="dropdown-item" href="#">
                    Thumbed me up
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    My Followings
                  </a>
                  <a className="dropdown-item" href="#">
                    New Followers
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link active" tabIndex="-1" aria-disabled="true">
                  G' day, {this.state.username}!
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
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
