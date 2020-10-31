import React, { Component } from 'react';
import FollowButton from "../components/FollowButton";
import BlockButton from "../components/BlockButton";
import OtherReview from '../components/OtherReview';
import OtherWishlist from '../components/OtherWishlist';

class OtherProfile extends Component {
    state = { userName: '' }

     componentDidMount(){
      const query = this.props.location.search;
      const username = query.split('=')[1];
      
      this.setState({
          userName: username
      })
  }

    render() { 
        return ( <React.Fragment>
            <h3>This is the profile page of {this.state.userName}</h3>
            <FollowButton follow=""/>
            <BlockButton block=""/>
            <OtherReview />
            <OtherWishlist />
        </React.Fragment> );
    }
}
 
export default OtherProfile;