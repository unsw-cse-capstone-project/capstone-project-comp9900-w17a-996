import React, { Component } from "react";
import Slider from "react-slick";
import "../styles/carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import poster from '../My perple, My Homeland(2020).jpg';
import recom1 from '../rec1.jpg';
import recom2 from '../rec2.jpg';
import recom3 from '../rec3.jpg';
import recom4 from '../rec4.jpg';
import recom5 from '../rec5.jpg';

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
                    <img src={poster} style={{width:'100%', height:'100%'}} />
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom1} style={{width:'100%', height:'100%'}} />
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom2} style={{width:'100%', height:'100%'}} />
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom3} style={{width:'100%', height:'100%'}} />
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom4} style={{width:'100%', height:'100%'}} />
                </div>
          </div>
          <div className="imgItem">
                <div>
                    <img src={recom5} style={{width:'100%', height:'100%'}} />
                </div>
          </div>
        </Slider>
      </div>
    );
  }
}
export default MyCarousel;