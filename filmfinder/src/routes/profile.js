import React, { Component } from "react";
import "../styles/centerCenter.css";

class Profile extends Component {
  state = {};
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
              <a className="nav-link" href="#">
                  <span data-feather="shopping-cart"></span>
                  My Followers
                </a>
              </li>
              <li className="nav-item btheader">
                <a className="nav-link" href="#">
                  <span data-feather="shopping-cart"></span>
                  My Followings
                </a>
              </li>
              <li className="nav-item btheader">
                <a className="nav-link" href="#">
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
                  <h3 className="text-info col-md-7 center-h">Modify your account information below</h3>
                
                <br/>
                <br/>
                <div className="row">
                  <div className="col-md-3">
                    <label for="userName">New Username</label>
                  </div>
                  <div className="col-md-9">
                  <input type="text" className="form-control" id="userName" placeholder="Default Usename" required/>
                  </div>
                </div>
                <br/>
                
                <div className="row">
                  <div className="col-md-3">
                    <label for="nickName">New Nickname</label>
                  </div>
                  <div className="col-md-9">
                  <input type="text" className="form-control" id="nickName" placeholder="Anoymous Poet" required/>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-md-3">
                    <label for="email">New Email</label>
                  </div>
                  <div className="col-md-9">
                  <input type="email" className="form-control" id="email" placeholder="Default Email" required/>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-md-3">
                    <label for="password">New Password</label>
                  </div>
                  <div className="col-md-9">
                  <input type="password" className="form-control" id="password" placeholder="" required/>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-md-3">
                    <label for="confirmPassword">Confirm New Password</label>
                  </div>
                  <div className="col-md-9">
                  <input type="password" className="form-control" id="confirmPassword" placeholder="" required/>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-md-3">
                    <label for="bio">New Bio</label>
                  </div>
                  <div className="col-md-9">
                  <textarea className="form-control" rows="5" cols="3" id="bio" placeholder="Nothing to show..." required/>
                  </div>
                </div>
                <br/>
                <br/>
                <div className="col-md-3 center-h">
                <a href="/#/login">
                <button className="btn btn-lg btn-info btn-block" id="btnSignUp" type="submit">
              Apply Changes
            </button>
                </a>
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
