import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "../styles/centerCenter.css";

class Login extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
          <div className="box_login">
          <form className="form-signin">
            <div className="text-center">
              <h1 className="h3 mb-3 font-weight-normal">
                Welcome to FilmFinder!
              </h1>
              
            </div>

            <input
              type="text"
              id="inputUsername"
              className="form-control"
              placeholder="Username"
              required
              autofocus
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />
            <br/>
            <button class="btn btn-lg btn-dark btn-block" id="btnLogin" type="submit">
              Sign in
            </button>
          </form>
            
          
          <div className="text-center">
              <br/>
            <Link to="/register">Not a member yet?</Link>
            <p className="mt-5 mb-3 text-muted">FilmFinder&copy; 2020 - 2021</p>
          </div>
        </div>
          
        
      </React.Fragment>
    );
  }
}

export default Login;
