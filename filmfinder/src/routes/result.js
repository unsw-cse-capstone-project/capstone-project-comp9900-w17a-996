import React, { Component } from "react";
import NavBar from "../components/NavBar";
import { Image } from "antd";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: [],
      genre: [],
      title: [],
      url: "The Forty-Year-Old Version",
    };
  }

  componentWillMount() {
    fetch("/searchByOther")
      .then((r) => r.json())
      .then((r) => {
        this.setState(r);
        console.log("Result UI:", r);
      });
  }

  setPare = () => {
    fetch("/searchByOther")
      .then((r) => r.json())
      .then((r) => {
        this.setState(r);
        console.log("Result UI:", r);
      });
  };

  // componentDidUpdate() {
  //   fetch("/search")
  //     .then((r) => r.json())
  //     .then((r) => {
  //       this.setState(r);
  //       console.log("Result UI:",r);
  //     });
  // }

  handleClick(ev, title) {
    // const data = {
    //   title: title,
    // };

    // fetch("/movieDetail", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => console.log(response))
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    window.location.href = "/#/movie?title=" + title;
  }

  handleImage = (title) => {
    let url_1 = title;
    if (title.indexOf(":") !== -1) {
      url_1 = url_1.replace(/:/, "");
    }
    return url_1;
  };

  // componentDidMount(){
  //     const reg = /([^=&s]+)[=s]([^=&s]+)/g;
  //     const obj = {};
  //     while(reg.exec(this.props.location.search.slice(1))){
  //         obj[RegExp.$1] = RegExp.$2;
  //     }
  //     console.log(obj);
  // }

  render() {
    if (this.state.movies) {
      const movies = this.state.movies;
      return (<React.Fragment>
        <NavBar setPare={this.setPare}></NavBar>
        <div className="pl-5 pt-4">
          <h4>{movies.length} movie(s) found: </h4>

          <div>
            {movies.map((movie) => {
              return (
                <div onClick={(ev) => this.handleClick(ev, movie.title)}>
                  <div className="row">
                    <img
                      src={require(`../${this.handleImage(movie.title)}.jpg`)}
                      width="100px"
                      height="150px"
                    />
                    <h3>Rating: {movie.rating}</h3>
                  </div>
                  <div>Title: {movie.title}</div>
                  <div>Genre: {movie.genre}</div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>)
    }

    const description = this.state.description;
    const genre = this.state.genre;
    const title = this.state.title;

    return (
      <React.Fragment>
        <NavBar setPare={this.setPare}></NavBar>
        <div className="pl-5 pt-4">
          <h4>{description.length} description(s) matches found: </h4>

          <div>
            {description.map((movie) => {
              return (
                <div onClick={(ev) => this.handleClick(ev, movie.title)}>
                  <div className="row">
                    <img
                      src={require(`../${this.handleImage(movie.title)}.jpg`)}
                      width="100px"
                      height="150px"
                    />
                    <h3>Rating: {movie.rating}</h3>
                  </div>
                  <div>Title: {movie.title}</div>
                  <div>Genre: {movie.genre}</div>
                </div>
              );
            })}
          </div>

          <h4>{genre.length} genre(s) matches found: </h4>

          <div>
            {genre.map((movie) => {
              return (
                <div onClick={(ev) => this.handleClick(ev, movie.title)}>
                  <div className="row">
                    <img
                      src={require(`../${this.handleImage(movie.title)}.jpg`)}
                      width="100px"
                      height="150px"
                    />
                    <h3>Rating: {movie.rating}</h3>
                  </div>
                  <div>Title: {movie.title}</div>
                  <div>Genre: {movie.genre}</div>
                </div>
              );
            })}
          </div>

          <h4>{title.length} title(s) matches found: </h4>

          <div>
            {title.map((movie) => {
              return (
                <div onClick={(ev) => this.handleClick(ev, movie.title)}>
                  <div className="row">
                    <img
                      src={require(`../${this.handleImage(movie.title)}.jpg`)}
                      width="100px"
                      height="150px"
                    />
                    <h3>Rating: {movie.rating}</h3>
                  </div>
                  <div>Title: {movie.title}</div>
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
