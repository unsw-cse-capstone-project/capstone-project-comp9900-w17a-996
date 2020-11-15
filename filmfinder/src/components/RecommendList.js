import React, { Component } from "react";
import { List, Avatar, Checkbox } from "antd";
class RecommendList extends Component {
  constructor(props){
    super(props);
    this.state = { recommendmovie: [], director: false, genre: false };
  }
  

  componentDidMount() {
    fetch("/recommendmovie")
      .then((r) => r.json())
      .then((r) => {
        this.setState(r);
        console.log("RecommendList:", r);
      });
  }

  onChangeDirector = (e) => {
    this.setState({director: e.target.checked});
    setTimeout(() => {
      console.log(`checkedDirector = ${this.state.director}`);
      this.popRecommend();
    }, 500)
    
  }

  onChangeGenre = (e) => {
    this.setState({genre: e.target.checked});
    setTimeout(() => {
      console.log(`checkedGenre = ${this.state.genre}`);
      this.popRecommend();
    })
  }

  popRecommend = () => {
    let userChoice = "";
    if (this.state.director && this.state.genre) {
      userChoice = "dg";
    }
    else if(this.state.director) {
      userChoice = "d";
    }
    else if(this.state.genre) {
      userChoice = "g";
    }
    else {
      userChoice = "no";
    }

    console.log(userChoice);
    const data = {choice: userChoice};
    console.log(data);

    fetch("/recommendmovie", {
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

      setTimeout(() => {
        fetch("/recommendmovie")
      .then((r) => r.json())
      .then((r) => {
        this.setState(r);
        console.log("RecommendList:", r);
      });
      }, 500)
  }

  handleNewClick(title) {
    

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

    

    setTimeout(() => {
    this.props.setPare(title);}, );
    
  }

  render() {
    const data = this.state.recommendmovie;
    return (
      <React.Fragment>
        <Checkbox onChange={this.onChangeDirector}>By Director</Checkbox>
        <Checkbox onChange={this.onChangeGenre}>By Genre</Checkbox>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                // avatar={<Avatar src={item.src} style={{height:'50px',width:'50px'}}/>}
                title={<a>{item.title}</a>}
                description={item.reason}
                onClick={() => this.handleNewClick(item.title)}
              />
            </List.Item>
          )}
        />
      </React.Fragment>
    );
  }
}

export default RecommendList;
