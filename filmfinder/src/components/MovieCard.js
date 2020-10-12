import React, { Component } from 'react';
import "../styles/moviecard.css";
import 'bootstrap/dist/css/bootstrap.css';
import PmRibbon from 'pm-ribbon';
import poster from '../poster.jpg';
import {Image} from 'antd';
//import YouTube from 'react-youtube';
class MovieCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            genre: "",
            releaseDate: "",
            cost: "",
            rating: "",
            user: {
                userName: "",
                rating: "",
                comment: ""
            }
        };
    }
    render(){
        const opts={
            playerVars: {
                autoplay: 0,
              },
        }
        return (
           <div>
               <p className="title">{this.props.title}</p>
               <div className="main">
                    <div className="stream">
                        <div className="image">
                            <Image width='100%' height="100%" src={poster} className="poster"/>
                        </div>
                        <div className="video">
                            <iframe id="test" width="100%" height="100%" src="https://www.youtube.com/embed/LaThRLnFxxw?autoplay=0&loop=1&playlist=EMfebeQg2Z4&muted=1" frameBorder="0" allowFullScreen={true} allowtransparency='yes'></iframe>
                        </div>
                    </div>
                    <div className="description">
                        <span>Directors:</span>
                        <br />
                        <span>Actors:</span>
                        <br />
                        <span>Genre: {this.props.genre}</span>
                        <br />
                        <span>Country:</span>
                        <br />
                        <span>Release date: {this.props.releaseDate}</span>
                    </div>

               </div>

           </div>
        )
    }
}

export default MovieCard;