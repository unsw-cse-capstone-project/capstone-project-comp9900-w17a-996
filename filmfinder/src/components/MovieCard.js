import React, { Component } from 'react';
import "../styles/moviecard.css";
import 'bootstrap/dist/css/bootstrap.css';
import PmRibbon from 'pm-ribbon';
// import poster from '../My perple, My Homeland(2020).';
import {Image} from 'antd';
//import YouTube from 'react-youtube';
class MovieCard extends Component{
    constructor(props){
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
                comment: ""
            }
        };
    }
    render(){
        const opts={
            playerVars: {
                autoplay: 0,
              },
        };

        if (this.props.title === ""){
            var url_1 = "My perple, My Homeland(2020)";
        }
        else{
            var url_1 = this.props.title;
        }
        
        return (
           <div>
               <p className="title">{this.props.title}</p>
               <div className="main">
                    <div className="stream">
                        <div className="image">
                            <img width='100%' height="100%" src={require(`../${url_1}.jpg`)} />
                        </div>
                        <div className="video">
                            <iframe id="test" width="100%" height="100%" src="https://www.youtube.com/embed/LaThRLnFxxw?autoplay=0&loop=1&playlist=EMfebeQg2Z4&muted=1" frameBorder="0" allowFullScreen={true} allowtransparency='yes'></iframe>
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
                    </div>

               </div>

           </div>
        )
    }
}

export default MovieCard;