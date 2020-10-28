import React, { Component } from 'react';
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
        </React.Fragment> );
    }
}
 
export default OtherProfile;