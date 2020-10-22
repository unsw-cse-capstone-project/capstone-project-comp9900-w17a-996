import React, { Component } from "react";
import "../styles/centerCenter.css";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "ERR",
      nickname: "ERR",
      password: "ERR",
      email: "ERR",
      bio: "Nothing to show",
    };
  }

  componentWillMount() {
    fetch('/home')
            .then(r => r.json())
            .then(r => {
                console.log(r);
                this.setProfile(r);
            })
  }

  setProfile(r) {
    if (r.username !== "") {
      this.setState(r);
    }
  }

  handleClick(ev, nickName, email, password, confirmPassword, bio) {

    var data = {
      username: this.state.username,
      nickname: this.state.nickname,
      email: this.state.email,
      password: this.state.password,
      bio: this.state.bio
    }

    if (nickName !== "") {
      data.nickname = nickName;
    }

    if (email !== "") {
      data.email = email;
    }

    if (password !== "" && password === confirmPassword) {
      data.password = password;
    }

    if (bio !== "") {
      data.bio = bio;
    }

    console.log(data);

    
    fetch("/profile", {
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

    this.props.history.push("/home");
  };

  render() {
    return (
      <React.Fragment>
        <div className="row col-md-12">
          <nav
            id="sidebarMenu"
            className="col-md-2 d-md-block badge-light sidebar"
          >
            <div className="sidebar-sticky pt-3">
              <ul className="nav flex-column btbar">
                <li className="nav-item btheader-current">
                  <a className="nav-link active">
                    <span data-feather="home"></span>
                    Manage Account <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item btheader">
                  <a className="nav-link">
                    <span data-feather="shopping-cart"></span>
                    My Followers
                  </a>
                </li>
                <li className="nav-item btheader">
                  <a className="nav-link">
                    <span data-feather="shopping-cart"></span>
                    My Followings
                  </a>
                </li>
                <li className="nav-item btheader">
                  <a className="nav-link">
                    <span data-feather="users"></span>
                    My Blocklist
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="col-md-1"></div>
          <div className="col-md-8">
            <div className="container-fluid pt-5">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-info col-md-7 center-h">
                    Modify your account information below
                  </h3>

                  <br />
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="userName">Username (Not Changeable)</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        value={this.state.username}
                        required
                      />
                    </div>
                  </div>
                  <br />

                  <div className="row">
                    <div className="col-md-3">
                      <label for="nickName">New Nickname</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        ref="nickName"
                        placeholder={this.state.nickname}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="email">New Email</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="email"
                        className="form-control"
                        ref="email"
                        placeholder={this.state.email}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="password">New Password</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="password"
                        className="form-control"
                        ref="password"
                        placeholder={this.state.password}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="confirmPassword">Confirm New Password</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="password"
                        className="form-control"
                        ref="confirmPassword"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="bio">New Bio</label>
                    </div>
                    <div className="col-md-9">
                      <textarea
                        className="form-control"
                        rows="5"
                        cols="3"
                        ref="bio"
                        placeholder={this.state.bio}
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="col-md-3 center-h">
                    <button
                      className="btn btn-lg btn-info btn-block"
                      id="btnSignUp"
                      type="submit"
                      onClick={(ev) => 
                      this.handleClick(
                        ev,
                        this.refs.nickName.value,
                        this.refs.email.value,
                        this.refs.password.value,
                        this.refs.confirmPassword.value,
                        this.refs.bio.value
                      )}
                    >
                      Apply Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
