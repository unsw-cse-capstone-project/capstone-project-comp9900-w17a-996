import React, { Component } from "react";
import "./style/centerCenter.css";

class Register extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="box_register">
            <form>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h2 className="text-info">Sign up Now!</h2>
                <br/>
                <div className="row">
                  <div className="col-md-4">
                    <h4>Username</h4>
                  </div>
                  <div className="col-md-8">
                  <input type="text" className="form-control" id="userName" placeholder="" required/>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-4">
                    <h4>Nickname</h4>
                  </div>
                  <div className="col-md-8">
                  <input type="text" className="form-control" id="nickName" placeholder="" required/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <h4>Email</h4>
                  </div>
                  <div className="col-md-8">
                  <input type="email" className="form-control" id="email" placeholder="" required/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <h4>Password</h4>
                  </div>
                  <div className="col-md-8">
                  <input type="password" className="form-control" id="password" placeholder="" required/>
                  </div>
                </div>
                <br/>
                <div className="col-md-13">
                <a href="/#/login">
                <button class="btn btn-lg btn-success btn-block" id="btnSignUp" type="submit">
              Sign up
            </button>
                </a>
                </div>
                
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
