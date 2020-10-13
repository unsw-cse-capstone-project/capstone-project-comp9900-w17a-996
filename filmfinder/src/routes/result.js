import React, { Component } from 'react';

class Result extends Component {
    constructor(props){
        super(props);
        this.state = {
        movies: [],
    };
    }

    componentWillMount() {
        fetch('/search')
      .then((r) => r.json())
      .then((r) => {
        this.setState(r);
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
      const movies = this.state.movies;
        return ( 
            <React.Fragment>
                <h1>Hello</h1>

                <div>
                {movies.map((movie) => {
          return (
            <div>
              <div>Title: {movie.title}</div>
              <div>Genre: {movie.genre}</div>
              <hr />
            </div>
          )
        })}
      </div>
        {/* <h2>{this.state.movies}</h2> */}
            </React.Fragment>
         );
    }
}
 
export default Result;