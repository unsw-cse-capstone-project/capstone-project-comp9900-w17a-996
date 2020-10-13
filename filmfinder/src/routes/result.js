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
        console.log(r);
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