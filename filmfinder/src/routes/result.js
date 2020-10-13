import React, { Component } from 'react';

class Result extends Component {
    constructor(props){
        super(props);
        this.state = {
        username: "",
    };
    }

    componentWillMount() {
        fetch("/search")
      .then((r) => r.json())
      .then((r) => {
        this.setUser(r.username);
      });
    }

    render() { 
        return ( 
            <React.Fragment>
                <h1>Hello</h1>
            </React.Fragment>
         );
    }
}
 
export default Result;