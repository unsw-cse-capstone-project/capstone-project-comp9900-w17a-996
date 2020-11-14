import React, { Component } from 'react';
import { Result, Button } from 'antd';

class RegisterSuccess extends Component {
    state = {  }

    goLogin = () => {
        window.location.href = "/#/login";
    }

    goHome = () => {
        window.location.href = "/#/";
    }

    render() { 
        return ( <React.Fragment>
            <Result
    status="success"
    title="Thank you! You are now a member of FilmFinder!"
    subTitle="Please take care of your username and password, have fun!"
    extra={[
      <Button type="primary" key="console" onClick={this.goLogin}>
       Login Now
      </Button>,
      <Button key="buy" onClick={this.goHome}>Go Home</Button>,
    ]}
  />
        </React.Fragment> );
    }
}
 
export default RegisterSuccess;