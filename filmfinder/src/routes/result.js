import React, { Component } from 'react';

class Result extends Component {
    constructor(props){
        super(props);
        this.state = {
        username: "",
    };
    }

    componentWillMount() {
        fetch('/search')
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
      });
    }

    sleep(time) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, time);
        });
      }

    // componentDidMount(){
    //     const reg = /([^=&s]+)[=s]([^=&s]+)/g;
    //     const obj = {};
    //     while(reg.exec(this.props.location.search.slice(1))){
    //         obj[RegExp.$1] = RegExp.$2;
    //     }
    //     console.log(obj);
    // }

    render() { 
        return ( 
            <React.Fragment>
                <h1>Hello</h1>
            </React.Fragment>
         );
    }
}
 
export default Result;