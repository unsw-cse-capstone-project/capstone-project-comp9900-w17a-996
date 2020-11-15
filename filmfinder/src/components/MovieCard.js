import React, { Component } from "react";
import "../styles/moviecard.css";
import "bootstrap/dist/css/bootstrap.css";
import PmRibbon from "pm-ribbon";
// import poster from '../My people, My Homeland(2020).';
import { Image } from "antd";
//import YouTube from 'react-youtube';
class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      director: "",
      cast: "",
      genre: "",
      language: "",
      date: "",
      url: "",
      user: {
        userName: "",
        rating: "",
        comment: "",
      },
    };
  }
  render() {
    const opts = {
      playerVars: {
        autoplay: 0,
      },
    };

    if (this.props.title === "") {
      var url_1 = "no_picture";
    } else {
      var url_1 = this.props.title;
      if (this.props.title.indexOf(":") !== -1) {
        url_1 = url_1.replace(/:/, "");
      }
    }

    return (
      <div>
        <p className="title">{this.props.title}</p>
        <div className="main">
          <div className="stream">
            <div className="image">
              <img
                width="100%"
                height="100%"
                src={require(`../${url_1}.jpg`)}
                alt={url_1}
              />
            </div>
            <div className="video">
              <iframe
                id="test"
                width="100%"
                height="100%"
                src={this.props.url}
                frameBorder="0"
                allowFullScreen={true}
                allowtransparency="yes"
              ></iframe>
            </div>
          </div>
          <div className="description">
            <span>Directors: {this.props.director}</span>
            <br />
            <span>Cast: {this.props.cast}</span>
            <br />
            <span>Genre: {this.props.genre}</span>
            <br />
            <span>Language: {this.props.language}</span>
            <br />
            <span>Release date: {this.props.date}</span>
            <br />
            <span>Description: {this.props.description}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
