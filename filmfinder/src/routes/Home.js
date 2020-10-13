import React, { Component,Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import searchImg from "../searchbar.png"
import {BorderSearchWarp, SearchWarp} from "../components/styledSearch"
import { Button } from 'antd';
import {StyledButton} from "../components/styledButton.js"
import {TransButton} from "../components/styledButton.js"


class Search extends Component {

  goLogin = () => {
    this.props.history.push("/login");
  }

  goProfile = () => {
    this.props.history.push("/profile");
  }

  goWishList = () => {
    this.props.history.push("/wishList");
  }

  render() {
    return (
        <BorderSearchWarp border={
            {
                width:"1px",
                color:"#d9e3f0",
                style:"solid",
                rodius:"10px"
                }
        }>
          
            <div>
                <img src={searchImg} /> 
                <Fragment>
                Searching Movies...
                </Fragment >
                <TransButton type="primary">Search</TransButton>
                <StyledButton type="primary" onClick={ this.goProfile }>Profile</StyledButton>
                <StyledButton type="primary">Messages</StyledButton>
                <StyledButton type="primary" onClick={ this.goWishList }>Wishlist</StyledButton>
                <StyledButton type="primary">History</StyledButton>
                <StyledButton type="primary" onClick={ this.goLogin }>Login/Register</StyledButton>
            </div>
        </BorderSearchWarp>
        
    );
  }
}

export default Search;