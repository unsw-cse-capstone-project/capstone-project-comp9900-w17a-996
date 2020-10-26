import React, { Component } from "react";
import { Modal, Checkbox} from 'antd';
import { Link } from "react-router-dom";
import "../styles/movie.css";
import PmRibbon from "pm-ribbon";
import "bootstrap/dist/css/bootstrap.css";
import MovieCard from "../components/MovieCard";
import Tabs from "../components/Tabs";
import { Layout, Button, Divider } from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import ShareAltOutlined from "@ant-design/icons/ShareAltOutlined";
import RatingResult from "../components/RatingResult";
import CommentCard from "../components/CommentCard";
import AddComment from "../components/AddComment";
import RecommendList from "../components/RecommendList";
import { WindowsOutlined } from "@ant-design/icons";
import NavBar from "../components/NavBar";
const { Header, Footer, Sider, Content } = Layout;

const plainOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.myWish = React.createRef();
    this.state = {
    ModalText: 'Please select the wishlist(s) to add:',
    visible: false,
    confirmLoading: false,
      title: "",
      director: "",
      cast: "",
      genre: "",
      language: "",
      date: "",
      rating: "",
      url: "",
      user: [],
    };
  }


  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

    console.log(this.myWish.current.state.value);

    const data = {
      title: this.state.title,
      type: this.myWish.current.state.value,
    }

    fetch("/addtoWishList", {
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

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  componentDidUpdate() {
    // fetch("/movieDetail")
    //   .then((r) => {
    //     console.log(r);
    //     return r.json();
    //   })
    //   .then((r) => {
    //     this.setState(r.movie);
    //     console.log(r);
    //   });

    fetch("/checkReview")
    .then((r) => {
      console.log(r);
      return r.json();
    })
    .then((r) => {
      this.setState(r);
      console.log(r);
    });
  }

  componentDidMount() {
    fetch("/movieDetail")
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then((r) => {
        this.setState(r.movie);
        console.log(r);
      });

    fetch("/checkReview")
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then((r) => {
        this.setState(r);
        console.log(r);
      });
  }

  addToWishlist = () => {
    console.log("123");

    this.setState({
      visible: true,
    });

    
  };

  onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  // componentDidMount(){
  //     fetch('/app')
  //         .then(r => r.json())
  //         .then(r => {
  //             this.setState(r);
  //         })
  // }
  render() {
    const comments = this.state.user;
    const commentItems = comments.map((commentItem) => (
      <CommentCard {...commentItem} />
    ));
    const { visible, confirmLoading, ModalText } = this.state;

    return (
      <div>
        <Layout className="layout">
          <NavBar></NavBar>
          {/* <Header className="header">header</Header> */}
          <Layout className="mainContent">
            <Content
              className="wrapper"
              style={{ padding: "0 150px", marginTop: 64 }}
            >
              <Layout className="detailmain">
                <Content className="left">
                  <div className="detailAndComments">
                    <div className="detail">
                      <MovieCard {...this.state} />
                    </div>
                    <Divider orientation="left">Comments</Divider>
                    <div className="comments">
                      <br />
                      <ul>{commentItems}</ul>
                      <AddComment title={this.state.title}/>
                      
                    </div>
                  </div>
                </Content>
                <Sider
                  className="sider"
                  style={{
                    overflow: "auto",
                    height: "700px",
                  }}
                >
                  <div className="ratingwishshare">
                    <div className="rating">
                      <Divider orientation="left">Rating</Divider>
                      <div className="result">
                        <div className="text">
                          <span>{this.state.rating}</span>
                        </div>
                        <div className="rate">
                          <RatingResult rating={this.state.rating} />
                          <p>{this.state.user.length} people rated</p>
                        </div>
                      </div>
                    </div>
                    <div className="wishShare">
                      <div className="wish">
                        <Button onClick={this.addToWishlist} type="primary" block>
                          <div>
                            <PlusOutlined
                              style={{ fontSize: "25px", marginRight: "10px" }}
                            />
                            Add to Wishlist
                          </div>
                        </Button>
                      </div>
                      <br />
                      <div className="share">
                        <Button type="primary" block>
                          <div>
                            <ShareAltOutlined
                              style={{ fontSize: "25px", marginRight: "10px" }}
                            />
                            Add to Wishlist
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="tabs">
                    <Tabs />
                  </div>
                  <Divider orientation="left">Recommend List</Divider>
                  <div className="recommendMovies">
                    <RecommendList />
                  </div>
                </Sider>
              </Layout>
            </Content>
          </Layout>
          <Footer className="footer">footer</Footer>
        </Layout>
        <Modal
          title="Select your wishlist"
          visible={visible}
          onOk={this.handleOk.bind(this)}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel.bind(this)}
        >
          <p>{ModalText}</p>
          <Checkbox.Group options={plainOptions} onChange={this.onChange.bind(this)} ref={this.myWish} />
        </Modal>
      </div>
    );
  }
}

export default MovieDetail;
