import { Alert } from "bootstrap";
import {withRouter} from 'react-router';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/centerCenter.css";

class Login extends Component {
  state = { message: -1 };

  handleChange(ev, inputUsername) {
    console.log(inputUsername);
    var data = {
      inputUsername: inputUsername
    }

    // post data to back-end
    fetch("/login", {
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

  handleClick(ev, inputPassword) {
    console.log("inputPassword",inputPassword);

    // this.syncSleep(5000);
    // receive member state from back-end
    fetch('/login')
      .then(result => result.json())
      .then(data => 
          this.checkPassword(data.password, inputPassword)
      );
    
      // this.syncSleep(1000);
      // console.log(this.state);
   }

   checkPassword(a, b) {
     console.log(a, b)
    if (a == b){
      console.log("Allow Login");
      this.props.history.push("/profile");
    }
    else{
      console.log("Reject!");
    }
   }

   syncSleep(time) {
    const start = new Date().getTime();
    while (new Date().getTime() - start < time) {}
  }


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
              ref="inputUsername"
              onChange = {
                (ev) =>
                this.handleChange(
                  ev, this.refs.inputUsername.value
                )
              }
              className="form-control"
              placeholder="Username"
              required
              autofocus
            />
            <input
              type="password"
              ref="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />
            <br />
            <button
              class="btn btn-lg btn-dark btn-block"
              onClick={(ev) =>
                this.handleClick(
                  ev,
                  this.refs.inputPassword.value
                )
              }
              ref="btnLogin"
              type="submit"
            >
              Sign in
            </button>
          </form>

          <div className="text-center">
            <br />
            <Link to="/register">Not a member yet?</Link>
            <p className="mt-5 mb-3 text-muted">FilmFinder&copy; 2020 - 2021</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;