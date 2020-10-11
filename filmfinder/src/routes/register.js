import { Alert } from "bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/centerCenter.css";

class Register extends Component {
  state = { username: "", email: "" };

  handleClick(ev, userName, nickName, email, password, confirmPassword, bio) {
   
    const data = {
      "userName": userName,
      "nickName": nickName,
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword,
      "bio": bio
    };
    console.log("HEllo");

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

  componentWillMount() {
    
  }

  render() {
    return (
      <React.Fragment>
        <div className="center-h col-md-7 pt-5">
          <form>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="text-info text-center">
                    Become a Member TODAY! :D
                  </h2>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="userName">Username*</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
            
                        className="form-control"
                        ref="userName"
                        placeholder=""
                        required="required"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="nickName">Nickname</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        ref="nickName"
                        placeholder="Anoymous Poet"
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="email">Email*</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="email"
                        className="form-control"
                        ref="email"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="password">Password*</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="password"
                        className="form-control"
                        ref="password"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-3">
                      <label for="confirmPassword">Confirm Password*</label>
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
                      <label for="bio">Bio</label>
                    </div>
                    <div className="col-md-9">
                      <textarea
                        className="form-control"
                        rows="5"
                        cols="3"
                        ref="bio"
                        placeholder="Add somrthing intersting..."
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <br />

                  <Link to="/login">
                    <button
                      className="btn btn-lg btn-info btn-block col-md-3 center-h form-control"
                      onClick={(ev) =>
                        this.handleClick(
                          ev,
                          this.refs.userName.value,
                          this.refs.nickName.value,
                          this.refs.email.value,
                          this.refs.password.value,
                          this.refs.confirmPassword.value,
                          this.refs.bio.value
                        )
                      }
                      id="btnSignUp"
                      type="submit"
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
