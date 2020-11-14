import React, { Component } from "react";
import Slider from "react-slick";
import "../styles/carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import poster from '../My people, My Homeland(2020).jpg';
import recom1 from '../Avengers Endgame.jpg';
import recom2 from '../Clouds.jpg';
import recom3 from '../Fifty Shades Freed.jpg';
import recom4 from '../Goodbye Mr. Loser.jpg';
import recom5 from '../Tales from the Hood 3.jpg';

//for the movie picutre display in home page
class MyCarousel extends Component {
    render(){
        return (
            <div>
                <CenterMode />
            </div>
        )
    }
}
class CenterMode extends Component {
  constructor(props){
    super(props);
    this.state = {
      movieList : ['My people, My Homeland(2020)','Avengers: Endgame','Clouds','Fifty Shades Freed','Goodbye Mr. Loser','Tales from the Hood 3']
    }
  }
  // jump to the moviedetial page
  handleClick = (e, title) => {
    console.log(title);
    window.location.href = "/#/movie?title=" + title;
  }
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "250px",
      slidesToShow: 3,
      focusOnSelect:true,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 500
    };
    
    return (
      <div>
        <Slider {...settings} className="slider">
          <div className="imgItem">
                <div>
                    <img src={poster} style={{width:'100%', height:'100%'}} onClick={(e) => this.handleClick(e, this.state.movieList[0])}/>
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom1} style={{width:'100%', height:'100%'}} onClick={(e) => this.handleClick(e, this.state.movieList[1])} />
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom2} style={{width:'100%', height:'100%'}} onClick={(e) => this.handleClick(e, this.state.movieList[2])} />
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom3} style={{width:'100%', height:'100%'}} onClick={(e) => this.handleClick(e, this.state.movieList[3])}/>
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom4} style={{width:'100%', height:'100%'}} onClick={(e) => this.handleClick(e, this.state.movieList[4])} />
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom5} style={{width:'100%', height:'100%'}} onClick={(e) => this.handleClick(e, this.state.movieList[5])} />
                </div>
          </div>
        </Slider>
      </div>
    );
  }
}
export default MyCarousel;