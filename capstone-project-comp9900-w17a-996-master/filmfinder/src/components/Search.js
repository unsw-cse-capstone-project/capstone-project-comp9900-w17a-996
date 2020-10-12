import React, { Component,Fragment } from 'react';
import searchImg from "../images/searchbar.png"
import {BorderSearchWarp, SearchWarp} from "./styledSearch"
import { Button } from 'antd';
import {StyledButton} from "./styledButtons"
import {TransButton} from "./styledButtons"




class Search extends Component {
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
                <StyledButton type="primary">Profile</StyledButton>
                <StyledButton type="primary">Messages</StyledButton>
                <StyledButton type="primary">Wishlist</StyledButton>
                <StyledButton type="primary">History</StyledButton>
                <StyledButton type="primary">Login/Register</StyledButton>
            </div>
        </BorderSearchWarp>
        
    );
  }
}

export default Search;