import React, { Component } from "react";
import poster from "../The Forty-Year-Old Version.jpg";
import { Image } from "antd";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      url: "The Forty-Year-Old Version"
    };
  }

  componentWillMount() {
    fetch("/search")
      .then((r) => r.json())
      .then((r) => {
        this.setState(r);
        console.log(r);
        // this.setState({
        //   url: r.movies.title.value
        // });
      });
  }

  handleClick(ev, title) {
    const data = {
      title: title,
    };

    fetch("/movieDetail", {
      method: "POST",
      headers: {
        Accept: "application/json",
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

  handleImage(title) {
    let path = "../" + title + ".jpg";
    console.log("path", path);
    return path;
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
        <div className="pl-5">

        <h3>Result List: </h3>

<div>
  {movies.map((movie) => {
    return (
      <div onClick={(ev) => this.handleClick(ev, movie.title)}>
        <img src={require(`../${movie.title}.jpg`) } width="100px"
          height="150px"/>
        {/* <Image
          width="100px"
          height="150px"
          src={poster}
          className="poster"
        /> */}
        <div >
          Title: {movie.title}
        </div>
        <div>Genre: {movie.genre}</div>
      </div>
    );
  })}
</div>
        </div>
        
      </React.Fragment>
    );
  }
}

export default Result;
