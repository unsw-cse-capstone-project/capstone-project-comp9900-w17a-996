import React, { Component } from "react";
import { message} from 'antd';
import { Link } from "react-router-dom";
import "../styles/centerCenter.css";


class Login extends Component {
  state = { message: -1,
    confirmLoading: false,
   };

  handleClick(inputUsername, inputPassword) {
    console.log(inputUsername, inputPassword);

    this.setState({confirmLoading: true});
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

      setTimeout(() => {
        fetch('/login')
      .then(result => result.json())
      .then(data => 
          // console.log(data)
          this.checkPassword(data.password, inputPassword)
      );
      this.setState({confirmLoading: false})
      }, 1000);
  }

   checkPassword(a, b) {
     console.log(a, b);
    if (a === b && a !== ''){
      console.log("Allow Login");
      this.props.history.push("/home");
    }
    else{
      console.log("Reject!");
      message.error('Incorrect username or password!');
    }
   };

   

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
              autoFocus
            />
            <input
              type="password"
              ref="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />
            <br />
            
          </form>
          <button
              type="button"
              className="btn btn-lg btn-dark btn-block"
              onClick={() => (this.handleClick(this.refs.inputUsername.value, this.refs.inputPassword.value))}
              ref="btnLogin"
              type="submit"
            >
              Sign in
            </button>

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