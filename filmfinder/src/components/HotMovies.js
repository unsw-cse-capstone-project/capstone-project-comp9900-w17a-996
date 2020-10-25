<<<<<<< HEAD
=======

>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
import React, { Component } from "react";

class HotMovies extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       movieName: ["我和我的祖国", "信条"],
  //       rating: ["1", "2"],
  //     };
  //   }

  // constructor(props) {
  //     super(props);
  //     this.state={
  //         list:["我和我的祖国 ", "信条"],
  //         list2:["1", "2"],

  //     };
  // }

  constructor(props) {
    super(props);
    this.state = {
      linkList: [
        "http://localhost:3000/#/dropdown",
        "#www.wechat.com/",
        "#www.instagram.com/",
      ],
<<<<<<< HEAD
      hotMovies: [],
=======
      mapList: [
        { name: '我和我的祖国', rating: "9" , title:'123'},
        { name: '信条', rating: "9.2", title:'234' },
        { name: '我和我的家乡', rating: "10" ,title:'567'},
      ],
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
    };
  }

  // componentDidMount(){
  //     var result = fetch("http://localhost:3003/chengpinInfo")
  //         .then(function(res){
  //             return res.json();
  //         })
  //         .then(function(data){
  //             console.log(data);
  //         })
  //  }

  styles = {
    fontSize: 30,
    fontWeight: "bold",
    color: "#B71C1C",
    position: "relative",
    left: "40px",
  };

  stylesLink = {
    width: "1000px",
    height: "30px",
    color: "#3F51B5",
    fontWeight: "bold",
    fontsize: "50px",
    position: "relative",
    left: "40px",
  };
<<<<<<< HEAD

=======
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
  handle() {
    const w = window.open("about:blank");
    w.location.href = "你的地址";
  }

<<<<<<< HEAD
  componentDidMount(){
    fetch("/hotmovie")
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      this.setState(r);
    });
  }

=======
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
  handleClick(ev, title) {
    const data = {
      title: title,
    }

<<<<<<< HEAD
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

=======
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
    window.location.href = "/#/movie?title=" + title;
}
    


  render() {
    // const content = this.state.mapList.map((item, key) => (
    //   <ul style={this.stylesLink} key={key}>
    //     {item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //     {item.rating}
        
    //   </ul>
    // ));
<<<<<<< HEAD
   const mapList = this.state.hotMovies;
=======
   const mapList = this.state.mapList;
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
    return (
      <div>
          
        {/* <ul>{this.state.list.map((item,key) =>{return<li key={key}>{item}</li>})}</ul>
    <ul>{this.state.list2.map((item,key) =>{return<li key={key}>{item}</li>})}</ul> */}

        <h1 style={this.styles}>Hot Movies List</h1>
        <div>
            {mapList.map((movie)=>{
                return(
                   <a onClick={(ev) => this.handleClick(ev, movie.title)}>
<<<<<<< HEAD
                       <div style={this.stylesLink}>{movie.title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; rating:{movie.rating}</div>
=======
                       <div style={this.stylesLink}>name:{movie.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; rating:{movie.rating}</div>
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
                       
                       </a> 
                    
                )
            })}
          <a
          
          
            // href={this.state.linkList.map((item, index) => (
            //   <ul key={index}>
            //     <li>{item}</li>
            //   </ul>
            // ))}
          >
            {/* <span>{content}</span>{" "} */}
          </a>
          {/* <div onClick={(ev) => this.handleClick(ev, this.state.linkList.title)}></div> */}

          {/* <a href="http://localhost:3000/#/dropdown">
            <span>hi</span>{" "}
            
          </a> */}
          {/* <ul style={this.stylesLink}>
          <a href="#www.facebook.com/">
            <span>{this.state.movieName[0]}</span>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; rating:{this.state.rating[0]}
          </a>
          <br />
          <a href="#www.instagram.com/">
            {" "}
            <span>{this.state.movieName[1]}</span>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; rating:{this.state.rating[1]}
          </a>
          <br />
          <a href="#Web.wechat.com/">
            我 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rating:
          </a>
          <br />
        </ul> */}

          {/* <h1 style={this.styles}>Hot Movies List</h1>
        <TransHotMovies style={this.stylesLink} onClick={this.handle}>
          我和我的祖国  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rating:
        </TransHotMovies>
        <br/>
        <TransHotMovies style={this.stylesLink} onClick={this.handle}>
          我和我  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rating:
        </TransHotMovies>
        <br/>
        <TransHotMovies style={this.stylesLink} onClick={this.handle}>
          我   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rating:
        </TransHotMovies> */}
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
export default HotMovies;
=======
export default HotMovies;
>>>>>>> 623abc30eba6bbd6937576f530f15c7efa94ed33
