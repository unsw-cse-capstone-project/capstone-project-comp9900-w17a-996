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

    handleClick(ev, title) {
      const data = {
        title: title
      }

      fetch("/movieDetail", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => console.log(response))
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      window.location.href = "/#/movie";
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
              <div onClick={(ev) =>
                        this.handleClick(
                          ev,
                          movie.title
                        )
                      }>Title: {movie.title}</div>
              <div>Genre: {movie.genre}</div>
              <hr />
            </div>
          )
        })}
      </div>
            </React.Fragment>
         );
    }
}
 
export default Result;