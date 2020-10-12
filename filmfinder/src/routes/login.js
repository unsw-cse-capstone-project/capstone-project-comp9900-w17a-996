import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/centerCenter.css";

class Login extends Component {
  state = { message: null };

  handleClick(ev, inputUsername, inputPassword) {
    console.log(inputUsername, inputPassword);
    var data = {
      inputUsername: inputUsername,
      inputPassword: inputPassword,
    };

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

    // fetch("/login")
    //   .then((response) => console.log(response))
    //   .then((data) => this.setState({ data }));

    // console.log("data", data);
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
                  this.refs.inputUsername.value,
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
